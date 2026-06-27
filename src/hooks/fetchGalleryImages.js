import { listAll, ref, getDownloadURL } from "firebase/storage";

export async function fetchGalleryImages(storage, galleryItem) {
  const originalFolderRef = ref(storage, galleryItem.folder);
  const thumbFolderRef = ref(storage, `${galleryItem.folder}-thumbnails`);

  const [originalResult, thumbResult] = await Promise.all([
    listAll(originalFolderRef),
    listAll(thumbFolderRef),
  ]);

  return Promise.all(
    originalResult.items.map(async (originalItem) => {
      const thumbItem = thumbResult.items.find(
        (item) => item.name === originalItem.name,
      );

      const originalUrl = await getDownloadURL(originalItem);

      const thumbUrl = thumbItem
        ? await getDownloadURL(thumbItem)
        : originalUrl;

      return {
        original: originalUrl,
        thumb: thumbUrl,
      };
    }),
  );
}
