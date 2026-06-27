import { useQuery } from "@tanstack/react-query";
import { fetchGalleryImages } from "./fetchGalleryImages";

export function useGalleryImages(storage, galleryItem) {
  return useQuery({
    queryKey: ["gallery", galleryItem?.folder],
    queryFn: () => fetchGalleryImages(storage, galleryItem),
    enabled: !!galleryItem,
    staleTime: 1000 * 60 * 5,
  });
}
