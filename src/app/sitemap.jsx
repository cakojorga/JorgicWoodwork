import { SITE_URL } from "../utility/site";
import { categories, galleryPath } from "../utility/categories";
import { getGalleryImages } from "../lib/galleryImages";

// Regenerated with the gallery cache, so new photos appear here too
export const revalidate = 3600;

export default async function sitemap() {
  const now = new Date();

  const galleries = await Promise.all(
    categories.map(async (category) => {
      const images = await getGalleryImages(category.folder).catch(() => []);
      return {
        url: `${SITE_URL}${galleryPath(category)}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
        // Image sitemap entries help the photos show up in Google Images
        images: images.map((image) => image.source),
      };
    }),
  );

  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...galleries,
    { url: `${SITE_URL}/privatnost`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/uslovi-koriscenja`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
