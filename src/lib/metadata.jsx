import { SITE_NAME } from "../utility/site";
import defaultImage from "../assets/highlights/kuhinja-sank-1600.webp";

const DEFAULT_IMAGE = {
  url: defaultImage.src,
  width: defaultImage.width,
  height: defaultImage.height,
  alt: "Bijela kuhinja po mjeri sa šankom – Jorgić Woodwork",
};

// Full per-page metadata. Next.js replaces (not merges) nested objects like
// openGraph between layout and page, so every page gets the complete set.
export function pageMetadata({ title, absoluteTitle, description, path, image, noindex = false }) {
  const ogImage = image ?? DEFAULT_IMAGE;
  const shareTitle = absoluteTitle ?? `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: path },
    // Only set when overriding: a `robots` key here replaces the layout's
    ...(noindex && { robots: { index: false, follow: true } }),
    openGraph: {
      type: "website",
      locale: "bs_BA",
      siteName: SITE_NAME,
      url: path,
      title: shareTitle,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [ogImage.url],
    },
  };
}
