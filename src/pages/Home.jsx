import About from "../components/About";
import Contact from "../components/Contact";
import Faq from "../components/Faq";
import Gallery from "../components/Gallery";
import Hero from "../components/Hero";
export default function Home() {
  return (
    <>
      <div className="container">
        <Hero />
      </div>
      <About />
      <Gallery />
      <Faq />

      <Contact />
    </>
  );
}
