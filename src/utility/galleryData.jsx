import { MdOutlineKitchen, MdOutlineDoorBack } from "react-icons/md";
import { BiCabinet } from "react-icons/bi";
import { FaStairs, FaChild } from "react-icons/fa6";
import { GiWoodBeam } from "react-icons/gi";
import { LuBedDouble, LuSparkles } from "react-icons/lu";
import { categories } from "./categories";
import kuhinje from "../assets/highlights/kuhinja-sank-800.webp";
import ormari from "../assets/highlights/ormar-lucna-vrata-800.webp";
import vrata from "../assets/highlights/klizna-vrata-800.webp";
import stepenice from "../assets/highlights/stepenice-hrast-800.webp";
import woodwork from "../assets/highlights/woodwork-staro-drvo-800.webp";
import djecijeSobe from "../assets/highlights/djecija-soba-krevet-na-sprat-800.webp";
import kreveti from "../assets/highlights/spavaca-soba-ormari-800.webp";
import specijalno from "../assets/highlights/bar-drvena-stabla-800.webp";

export { galleryPath, findCategory, findLegacyItem, toSlug } from "./categories";

// Icons shown next to each category in the About list and the footer
const icons = {
  kuhinje: MdOutlineKitchen,
  ormari: BiCabinet,
  vrata: MdOutlineDoorBack,
  stepenice: FaStairs,
  woodwork: GiWoodBeam,
  "djecije-sobe": FaChild,
  kreveti: LuBedDouble,
  specijalno: LuSparkles,
};

// Cover photo on each category card in the About section
const covers = {
  kuhinje,
  ormari,
  vrata,
  stepenice,
  woodwork,
  "djecije-sobe": djecijeSobe,
  kreveti,
  specijalno,
};

// Where to crop a cover that doesn't have its subject in the middle
const coverPositions = {
  vrata: "80% center", // the sliding door is on the right, a bunk bed on the left
};

export const galleryData = categories.map((item) => ({
  ...item,
  icon: icons[item.slug],
  cover: covers[item.slug],
  coverPosition: coverPositions[item.slug],
}));
