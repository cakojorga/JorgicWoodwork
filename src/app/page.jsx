import About from "../components/About";
import Contact from "../components/Contact";
import Faq from "../components/Faq";
import Gallery from "../components/Gallery";
import Hero from "../components/Hero";
import HashScroll from "../components/HashScroll";
import JsonLd from "../components/JsonLd";
import { faqs } from "../utility/faqData";
import { faqSchema } from "../lib/structuredData";
import { pageMetadata } from "../lib/metadata";

export const metadata = pageMetadata({
  absoluteTitle: "Jorgić Woodwork | Namještaj po mjeri, kuhinje, ormari i stolarija",
  description:
    "Stolarija Jorgić iz Banja Luke: kuhinje, ormari, kreveti, vrata, prozori i stepenice po mjeri. Više od 30 godina iskustva u izradi namještaja.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <HashScroll />
      <Hero />
      <About />
      <Gallery />
      <Faq />
      <Contact />
      <JsonLd data={faqSchema(faqs)} />
    </>
  );
}
