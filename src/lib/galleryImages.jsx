import { getMetadata, listAll, ref } from "firebase/storage";
import { unstable_cache } from "next/cache";
import { storage } from "../../firebase";

const BUCKET = storage.app.options.storageBucket;

// Public Firebase download URL. The bucket allows public reads, so no per-file
// token (and no extra getDownloadURL request per image) is needed.
export const firebaseUrl = (fullPath) =>
  `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${encodeURIComponent(fullPath)}?alt=media`;

// Thumbnails are served from our own domain by app/slike/[...path]/route.jsx,
// byte-for-byte the same file, but cached on the CDN. Firebase itself takes
// up to ~1.5 s per image, which is what made galleries feel slow.
const thumbUrl = (fullPath) => `/slike/${fullPath.split("/").map(encodeURIComponent).join("/")}`;

// Full-size photos are 2–3 MB JPEGs; the lightbox gets a resized, cached WebP
// from Next.js image optimisation instead (allowed in next.config.mjs).
const lightboxUrl = (fullPath) =>
  `/_next/image?url=${encodeURIComponent(firebaseUrl(fullPath))}&w=1920&q=75`;

// The order is set in the admin app (jorgicwoodworkupload) and stored as custom
// metadata "order" (1, 2, 3...) on each original photo. The admin app sorts with
// the same rule (jorgicwoodworkupload/src/utility/galleryOrder.js); keep them in sync.
function parseOrder(value) {
  if (value === undefined || value === null || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

const compareNames = (a, b) => (a < b ? -1 : a > b ? 1 : 0);

// Ordered photos first, then the rest (e.g. new uploads) by file name, as before
function sortByOrder(items) {
  return [...items].sort((a, b) => {
    if (a.order !== null && b.order !== null) {
      return a.order - b.order || compareNames(a.item.name, b.item.name);
    }
    if (a.order !== null) return -1;
    if (b.order !== null) return 1;
    return compareNames(a.item.name, b.item.name);
  });
}

async function loadFolder(folder) {
  const [originals, thumbs] = await Promise.all([
    listAll(ref(storage, folder)),
    listAll(ref(storage, `${folder}-thumbnails`)),
  ]);

  const thumbByName = new Map(thumbs.items.map((item) => [item.name, item]));

  // Missing metadata only moves a photo to the end instead of breaking the page
  const ordered = sortByOrder(
    await Promise.all(
      originals.items.map(async (item) => {
        const metadata = await getMetadata(item).catch(() => null);
        return { item, order: parseOrder(metadata?.customMetadata?.order) };
      }),
    ),
  );

  // Thumbnails are matched by file name,
  // falling back to the original when a thumbnail is missing.
  return ordered.map(({ item }) => {
    const thumb = thumbByName.get(item.name);
    return {
      name: item.name,
      original: lightboxUrl(item.fullPath),
      thumb: thumb ? thumbUrl(thumb.fullPath) : lightboxUrl(item.fullPath),
      // Untouched full-size file, for the sitemap and structured data
      source: firebaseUrl(item.fullPath),
    };
  });
}

// Cached for an hour, so newly uploaded photos show up without a redeploy
export const getGalleryImages = unstable_cache(loadFolder, ["gallery-images-v3"], {
  revalidate: 3600,
});
