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
    "Jorgić Woodwork izrađuje kuhinje, ormare, krevete, vrata, prozore, stepenice i ostalu stolariju po mjeri u Banjoj Luci i okolini. Kvalitetna izrada i više od 30 godina iskustva.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <HashScroll />
      <div className="container">
        <Hero />
      </div>
      <About />
      <Gallery />
      <Faq />
      <Contact />
      <JsonLd data={faqSchema(faqs)} />
    </>
  );
}
