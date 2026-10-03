// Homepage slider: a hand-picked selection of our best work.
// `category` is a galleryData slug; clicking the slide opens that gallery.
// Images are 16:10 WebP in two widths (800 / 1600) in src/assets/highlights.
import kuhinjaSank800 from "../assets/highlights/kuhinja-sank-800.webp";
import kuhinjaSank1600 from "../assets/highlights/kuhinja-sank-1600.webp";
import barDrvenaStabla800 from "../assets/highlights/bar-drvena-stabla-800.webp";
import barDrvenaStabla1600 from "../assets/highlights/bar-drvena-stabla-1600.webp";
import djecijaSobaKrevetNaSprat800 from "../assets/highlights/djecija-soba-krevet-na-sprat-800.webp";
import djecijaSobaKrevetNaSprat1600 from "../assets/highlights/djecija-soba-krevet-na-sprat-1600.webp";
import ormarLucnaVrata800 from "../assets/highlights/ormar-lucna-vrata-800.webp";
import ormarLucnaVrata1600 from "../assets/highlights/ormar-lucna-vrata-1600.webp";
import stepeniceHrast800 from "../assets/highlights/stepenice-hrast-800.webp";
import stepeniceHrast1600 from "../assets/highlights/stepenice-hrast-1600.webp";
import tvZidMermer800 from "../assets/highlights/tv-zid-mermer-800.webp";
import tvZidMermer1600 from "../assets/highlights/tv-zid-mermer-1600.webp";
import kliznaVrata800 from "../assets/highlights/klizna-vrata-800.webp";
import kliznaVrata1600 from "../assets/highlights/klizna-vrata-1600.webp";
import woodworkStaroDrvo800 from "../assets/highlights/woodwork-staro-drvo-800.webp";
import woodworkStaroDrvo1600 from "../assets/highlights/woodwork-staro-drvo-1600.webp";
import policaKamion800 from "../assets/highlights/polica-kamion-800.webp";
import policaKamion1600 from "../assets/highlights/polica-kamion-1600.webp";
import spavacaSobaOrmari800 from "../assets/highlights/spavaca-soba-ormari-800.webp";
import spavacaSobaOrmari1600 from "../assets/highlights/spavaca-soba-ormari-1600.webp";

const images = {
  "kuhinja-sank": [kuhinjaSank800, kuhinjaSank1600],
  "bar-drvena-stabla": [barDrvenaStabla800, barDrvenaStabla1600],
  "djecija-soba-krevet-na-sprat": [djecijaSobaKrevetNaSprat800, djecijaSobaKrevetNaSprat1600],
  "ormar-lucna-vrata": [ormarLucnaVrata800, ormarLucnaVrata1600],
  "stepenice-hrast": [stepeniceHrast800, stepeniceHrast1600],
  "tv-zid-mermer": [tvZidMermer800, tvZidMermer1600],
  "klizna-vrata": [kliznaVrata800, kliznaVrata1600],
  "woodwork-staro-drvo": [woodworkStaroDrvo800, woodworkStaroDrvo1600],
  "polica-kamion": [policaKamion800, policaKamion1600],
  "spavaca-soba-ormari": [spavacaSobaOrmari800, spavacaSobaOrmari1600],
};

const highlight = (name, category, alt) => {
  const [small, large] = images[name];
  return {
    id: name,
    category,
    alt,
    src: large.src,
    srcSet: `${small.src} 800w, ${large.src} 1600w`,
    // Used for Open Graph images
    width: large.width,
    height: large.height,
  };
};

export const highlights = [
  highlight(
    "bar-drvena-stabla",
    "specijalno",
    "Bar sa dekorativnim drvenim stablima i LED rasvjetom",
  ),
  highlight(
    "kuhinja-sank",
    "kuhinje",
    "Bijela kuhinja sa šankom i barskim stolicama",
  ),
  highlight(
    "djecija-soba-krevet-na-sprat",
    "djecije-sobe",
    "Dječija soba sa krevetom na sprat i mrežom za igru",
  ),
  highlight(
    "ormar-lucna-vrata",
    "ormari",
    "Ugradni ormar sa lučnim vratima i otvorenim policama",
  ),
  highlight(
    "stepenice-hrast",
    "stepenice",
    "Hrastove stepenice sa ormarom ispod",
  ),
  highlight(
    "tv-zid-mermer",
    "specijalno",
    "TV zid sa mermernom oblogom i policama",
  ),
  highlight("klizna-vrata", "vrata", "Klizna drvena vrata u rustičnom stilu"),
  highlight(
    "woodwork-staro-drvo",
    "woodwork",
    "Police i zidne obloge od starog drveta",
  ),
  highlight(
    "polica-kamion",
    "djecije-sobe",
    "Dječija polica u obliku kamiona iznad kreveta",
  ),
  highlight(
    "spavaca-soba-ormari",
    "ormari",
    "Spavaća soba sa ugradnim ormarima oko kreveta",
  ),
];
