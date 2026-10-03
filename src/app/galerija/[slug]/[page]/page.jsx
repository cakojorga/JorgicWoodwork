import { galleryMetadata, pageParams, renderGalleryPage } from "../../../../lib/galleryPage";

// Pages 2+ of a category, e.g. /galerija/kuhinje/2. Static like page 1;
// pages that appear later (more photos uploaded) are generated on first visit.
export const revalidate = 3600;

export async function generateStaticParams() {
  return pageParams();
}

export async function generateMetadata({ params }) {
  const { slug, page } = await params;
  return galleryMetadata(slug, page);
}

export default async function GalleryPageN({ params }) {
  const { slug, page } = await params;
  return renderGalleryPage(slug, page);
}
