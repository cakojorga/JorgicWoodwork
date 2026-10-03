import { MdOutlineKitchen, MdOutlineDoorBack } from "react-icons/md";
import { BiCabinet } from "react-icons/bi";
import { FaStairs, FaChild } from "react-icons/fa6";
import { GiWoodBeam } from "react-icons/gi";
import { LuBedDouble, LuSparkles } from "react-icons/lu";
import { categories } from "./categories";

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

export const galleryData = categories.map((item) => ({
  ...item,
  icon: icons[item.slug],
}));
