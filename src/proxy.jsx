import { NextResponse } from "next/server";
import { findCategory, findLegacyItem, galleryPagePath } from "./utility/categories";

// Permanent (308) redirects for old gallery URLs, so search engines move
// their ranking over to the current address:
//   /Galerija/Dnevne%20sobe           -> /galerija/woodwork
//   /Galerija/Kuhinje?page=2          -> /galerija/kuhinje/2
//   /galerija/kuhinje?page=2          -> /galerija/kuhinje/2   (pagination used to be a query)
//   /galerija/retro, /galerija/ostali-stolarski-radovi/2 -> renamed categories
//   /galerija/kuhinje/1               -> /galerija/kuhinje
// The gallery page redirects these too, but from here it's one clean 308
// (Next.js sends the Location header twice when a page redirects).
export function proxy(request) {
  const { pathname, searchParams } = request.nextUrl;
  const oldCase = pathname.startsWith("/Galerija/");
  if (!oldCase && !pathname.startsWith("/galerija/")) return NextResponse.next();

  const [slugParam = "", pageParam] = decodeURIComponent(pathname.slice("/galerija/".length))
    .replace(/\/+$/, "")
    .split("/");
  const current = findCategory(slugParam);
  const category = current ?? findLegacyItem(slugParam);

  const hasQueryPage = searchParams.has("page");
  const isPageOne = pageParam === "1";
  // Only redirect old addresses; current URLs pass straight through
  if (!oldCase && !hasQueryPage && !isPageOne && current) return NextResponse.next();
  if (!category) return NextResponse.next(); // unknown -> the normal 404

  // Same rule the site always used: anything that isn't a positive number is page 1
  const page = /^\d+$/.test(pageParam ?? "")
    ? Number(pageParam)
    : parseInt(searchParams.get("page"), 10) || 1;

  const url = request.nextUrl.clone();
  url.pathname = galleryPagePath(category, page);
  url.search = "";
  return NextResponse.redirect(url, 308);
}

// Keep the legacy slugs here in sync with `legacySlugs` in utility/categories.jsx
export const config = {
  matcher: [
    "/Galerija/:path*",
    { source: "/galerija/:slug", has: [{ type: "query", key: "page" }] },
    "/galerija/:slug/1",
    "/galerija/retro/:path*",
    "/galerija/dnevne-sobe/:path*",
    "/galerija/ostali-stolarski-radovi/:path*",
  ],
};
