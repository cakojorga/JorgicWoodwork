import { notFound, permanentRedirect } from "next/navigation";
import GalleryView from "../views/GalleryView";
import JsonLd from "../components/JsonLd";
import { categories, findCategory, findLegacyItem, galleryPath, galleryPagePath } from "../utility/categories";
import { highlights } from "../utility/highlightsData";
import { SITE_NAME } from "../utility/site";
import { getGalleryImages } from "./galleryImages";
import { pageMetadata } from "./metadata";
import { breadcrumbSchema, gallerySchema } from "./structuredData";

// Shared by app/galerija/[slug]/page.jsx (page 1) and
// app/galerija/[slug]/[page]/page.jsx (page 2+). Both are static and
// regenerated hourly, so opening a category is instant.

export const IMAGES_PER_PAGE = 12;

const pageTitle = (category, page) =>
  `${category.seoTitle}${page > 1 ? ` – strana ${page}` : ""}`;

// Share image: one of the hand-picked slider photos from this category, if any
function shareImage(category) {
  const highlight = highlights.find((h) => h.category === category.slug);
  if (!highlight) return undefined;
  return { url: highlight.src, width: highlight.width, height: highlight.height, alt: highlight.alt };
}

export const categoryParams = () => categories.map((category) => ({ slug: category.slug }));

// Every { slug, page } for pages 2+ of every category
export async function pageParams() {
  const perCategory = await Promise.all(
    categories.map(async (category) => {
      const images = await getGalleryImages(category.folder);
      const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);
      return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, i) => ({
        slug: category.slug,
        page: String(i + 2),
      }));
    }),
  );
  return perCategory.flat();
}

// Resolves the category and page, or redirects / 404s
async function resolve(slug, pageParam) {
  const category = findCategory(slug);

  if (!category) {
    // Old links like /galerija/retro or /galerija/dnevne-sobe; keep them working with a 308
    const legacyItem = findLegacyItem(decodeURIComponent(slug));
    if (legacyItem) {
      permanentRedirect(pageParam ? galleryPagePath(legacyItem, Number(pageParam)) : galleryPath(legacyItem));
    }
    notFound();
  }

  let currentPage = 1;
  if (pageParam !== undefined) {
    // Only plain numbers are page URLs; /2 is page 2, /1 is the category itself
    if (!/^\d+$/.test(pageParam)) notFound();
    currentPage = Number(pageParam);
    if (currentPage === 1) permanentRedirect(galleryPath(category));
  }

  const images = await getGalleryImages(category.folder);
  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);
  if (currentPage < 1 || (currentPage > totalPages && totalPages > 0)) notFound();

  return { category, images, currentPage, totalPages };
}

export async function galleryMetadata(slug, pageParam) {
  const category = findCategory(slug);
  if (!category) {
    return { title: "Stranica nije pronađena", robots: { index: false, follow: true } };
  }
  const currentPage = pageParam !== undefined && /^\d+$/.test(pageParam) ? Number(pageParam) : 1;

  // A page number past the end renders the 404; keep it out of search results
  if (pageParam !== undefined) {
    const images = await getGalleryImages(category.folder);
    const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);
    if (!/^\d+$/.test(pageParam) || currentPage > totalPages) {
      return { title: "Stranica nije pronađena", robots: { index: false, follow: true } };
    }
  }

  return pageMetadata({
    title: pageTitle(category, currentPage),
    description: `${category.description} Pogledajte naše radove iz Banja Luke i okoline.`,
    path: galleryPagePath(category, currentPage),
    image: shareImage(category),
  });
}

export async function renderGalleryPage(slug, pageParam) {
  const { category, images, currentPage, totalPages } = await resolve(slug, pageParam);

  const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
  const pageImages = images.slice(startIndex, startIndex + IMAGES_PER_PAGE);
  const path = galleryPagePath(category, currentPage);

  return (
    <>
      <GalleryView
        // New key per page, so the lightbox state resets when the page changes
        key={path}
        category={{ slug: category.slug, title: category.title, description: category.description }}
        images={pageImages}
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        pageTitle={`${pageTitle(category, currentPage)} | ${SITE_NAME}`}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Početna", path: "/" },
          { name: category.title, path: galleryPath(category) },
        ])}
      />
      <JsonLd data={gallerySchema(category, pageImages, path)} />
    </>
  );
}
