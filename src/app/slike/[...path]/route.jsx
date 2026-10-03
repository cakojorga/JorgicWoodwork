import { categories } from "../../../utility/categories";
import { firebaseUrl } from "../../../lib/galleryImages";

// Only gallery thumbnail folders can be fetched through here
const allowedFolders = new Set(categories.map((c) => `${c.folder}-thumbnails`));

// Serves a gallery thumbnail from Firebase Storage under our own domain.
// The response is identical to Firebase's, but the CDN keeps it, so after the
// first visitor it loads in milliseconds instead of ~1 s.
export async function GET(request, { params }) {
  const { path } = await params;
  const segments = path.map((segment) => {
    try {
      return decodeURIComponent(segment);
    } catch {
      return segment;
    }
  });

  // Only a known thumbnail folder plus a plain image file name
  // (any script's letters: some uploads are named e.g. "9. јун 2026. 08_12_48.png")
  const validName = /^[\p{L}\p{N}_\-. ()]+\.(jpe?g|png|webp)$/iu;
  if (segments.length !== 2 || !allowedFolders.has(segments[0]) || !validName.test(segments[1])) {
    return new Response("Not found", { status: 404 });
  }

  // Kept in Next's data cache too, so even a CDN miss doesn't wait on Firebase
  const upstream = await fetch(firebaseUrl(segments.join("/")), {
    cache: "force-cache",
    next: { revalidate: 2592000 },
  });
  if (!upstream.ok) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(await upstream.arrayBuffer(), {
    headers: {
      "Content-Type": upstream.headers.get("content-type") ?? "image/jpeg",
      // Browsers keep it for a day, the CDN for 30 days (refreshed in the background)
      "Cache-Control": "public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400",
    },
  });
}
