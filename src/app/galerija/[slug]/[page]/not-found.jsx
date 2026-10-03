import NotFound from "../../../../views/NotFound";

export const metadata = {
  title: "Stranica nije pronađena",
  robots: { index: false, follow: true },
};

// A gallery page number that doesn't exist, e.g. /galerija/kuhinje/99
export default function GalleryPageNotFound() {
  return <NotFound />;
}
