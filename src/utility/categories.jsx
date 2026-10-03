// Plain category data, safe to import anywhere (server, client, proxy).
// UI-only extras such as icons live in galleryData.js.
//
// slug        -> URL: /galerija/<slug>
// folder      -> Firebase Storage folder (thumbnails live in "<folder>-thumbnails")
// seoTitle    -> <title> / Open Graph title for the category page
// legacySlugs -> old URLs that should redirect here
export const categories = [
  {
    id: 1,
    slug: "kuhinje",
    title: "Kuhinje",
    seoTitle: "Kuhinje po mjeri u Banjoj Luci",
    description: "Kuhinje po mjeri prilagođene prostoru i potrebama korisnika.",
    folder: "Kuhinje",
  },
  {
    id: 2,
    slug: "ormari",
    title: "Ormari",
    seoTitle: "Ormari i plakari po mjeri",
    description:
      "Klizni i klasični ormari izrađeni prema dimenzijama prostora.",
    folder: "Ormari",
  },
  {
    id: 3,
    slug: "vrata",
    title: "Vrata",
    seoTitle: "Drvena vrata po mjeri",
    description: "Unutrašnja i spoljašnja vrata izrađena od drveta",
    folder: "Vrata",
  },
  {
    id: 4,
    slug: "stepenice",
    title: "Stepenice",
    seoTitle: "Drvene stepenice po mjeri",
    description:
      "Drvene stepenice izrađene po mjeri za stambene i poslovne objekte.",
    folder: "Stepenice",
  },
  {
    id: 5,
    slug: "woodwork",
    title: "Woodwork",
    seoTitle: "Woodwork – namještaj i obloge od drveta",
    description:
      "Namještaj i obloge od drveta sa prirodnim teksturama i rustičnim karakterom.",
    folder: "Woodwork",
    // Earlier names of this category: "Dnevne sobe", then "Retro"
    legacySlugs: ["retro", "dnevne-sobe"],
  },
  {
    id: 6,
    slug: "djecije-sobe",
    title: "Dječije sobe",
    seoTitle: "Namještaj za dječije sobe po mjeri",
    description:
      "Namještaj za dječije sobe prilagođen rasporedu i potrebama prostorije.",
    folder: "Dječije sobe",
  },
  {
    id: 7,
    slug: "kreveti",
    title: "Kreveti",
    seoTitle: "Drveni kreveti po mjeri",
    description:
      "Drveni kreveti izrađeni po mjeri sa mogućnošću dodatnog prostora za odlaganje.",
    folder: "Kreveti",
  },
  {
    id: 8,
    slug: "specijalno",
    title: "Specijalno",
    seoTitle: "Specijalni stolarski radovi po mjeri",
    description:
      "Različiti stolarski projekti izrađeni prema zahtjevima i namjeni.",
    folder: "Specijalno",
    // Earlier name of this category
    legacySlugs: ["ostali-stolarski-radovi"],
  },
];

export const galleryPath = (item) => `/galerija/${item.slug}`;

// Page 1 is the category URL itself; later pages are /galerija/<slug>/<n>
export const galleryPagePath = (item, page) =>
  page > 1 ? `${galleryPath(item)}/${page}` : galleryPath(item);

export const findCategory = (slug) => categories.find((item) => item.slug === slug);

// "Dječije sobe" -> "djecije-sobe". Used to redirect old /Galerija/<Title> URLs.
export const toSlug = (text) =>
  text
    .toLowerCase()
    .replace(/đ/g, "dj")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/\s+/g, "-");

// Finds the category an old URL (/Galerija/Dnevne%20sobe, /galerija/retro) points to
export const findLegacyItem = (param) => {
  const slug = toSlug(param);
  return categories.find(
    (item) => item.slug === slug || item.legacySlugs?.includes(slug),
  );
};
