import { categoryParams, galleryMetadata, renderGalleryPage } from "../../../lib/galleryPage";

// Prerendered at build time and regenerated at most once an hour,
// so new photos in Firebase appear without a redeploy.
export const revalidate = 3600;

export function generateStaticParams() {
  return categoryParams();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return galleryMetadata(slug);
}

export default async function GalleryPage({ params }) {
  const { slug } = await params;
  return renderGalleryPage(slug);
}
