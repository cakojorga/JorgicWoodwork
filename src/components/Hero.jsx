"use client";

import classes from "./Hero.module.css";
import { HiArrowRight } from "react-icons/hi2";
import { useScrollToSection } from "../hooks/useScrollToSection";
// Bar "988" with the wooden trees, cut 16:10 from the 3000px original
// (Firebase: Specijalno/20260711_133052.jpg), in three widths so large and
// retina screens get a sharp image
import heroSmall from "../assets/hero/bar-hero-960.webp";
import heroMedium from "../assets/hero/bar-hero-1800.webp";
import heroLarge from "../assets/hero/bar-hero-2560.webp";

const STATS = [
  { value: "30+", label: "godina iskustva" },
  { value: "1000+", label: "projekata" },
  { value: "500+", label: "zadovoljnih klijenata" },
];

// The entrance animation is plain CSS (Hero.module.css), not Framer Motion,
// so the headline is visible as soon as the HTML is painted instead of
// waiting for JavaScript. Same timing and easing as before.
const fadeUp = (delay) => ({ style: { animationDelay: `${delay}s` } });

export default function Hero() {
  const { scrollToSection } = useScrollToSection();

  return (
    <section className={classes.hero} id="home" aria-labelledby="home-title">
      {/* Full-bleed photo; decorative, the headline says what the page is about */}
      <img
        src={heroMedium.src}
        srcSet={`${heroSmall.src} 960w, ${heroMedium.src} 1800w, ${heroLarge.src} 2560w`}
        sizes="100vw"
        alt=""
        className={classes.background}
        fetchPriority="high"
      />
      <div className={classes.overlay} aria-hidden="true" />

      {/* Thin guide lines on the navbar's content edges */}
      <div className={classes.frame} aria-hidden="true" />

      <div className={classes.inner}>
        <div className={classes.heroContent}>
          {/* The small label is part of the <h1> (not a separate <p>) so the page's
              main heading also names the business, the trade and the city,
              which is what Google weighs most when deciding what the page is about */}
          <h1 id="home-title" className={classes.heroTitle}>
            <span {...fadeUp(0)} className={`${classes.eyebrow} ${classes.fadeUp}`}>
              Stolarija Jorgić · Banja Luka
            </span>
            <span {...fadeUp(0.05)} className={`${classes.titleMain} ${classes.fadeUp}`}>
              Unaprijedi svoj{" "}
              <span className={classes.highlight}>
                dom
                <svg
                  className={classes.underline}
                  viewBox="0 0 120 14"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 9.5C28 4 62 2.5 117 6.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    pathLength="1"
                    className={classes.underlinePath}
                  />
                </svg>
              </span>
            </span>
          </h1>

          <p {...fadeUp(0.15)} className={`${classes.heroSubtitle} ${classes.fadeUp}`}>
            Izrada kuhinja, ormara, vrata i namještaja po mjeri u Banjoj Luci i
            okolini. Spoj tradicionalne izrade i modernog dizajna za dugotrajan
            kvalitet.
          </p>

          <div {...fadeUp(0.25)} className={`${classes.btnContainer} ${classes.fadeUp}`}>
            <button
              className={classes.primaryButton}
              onClick={() => scrollToSection("kontakt")}
            >
              Zatraži ponudu
            </button>
            <button
              className={classes.secondaryButton}
              onClick={() => scrollToSection("o-nama")}
            >
              Pogledaj radove
              <HiArrowRight className={classes.arrow} aria-hidden="true" />
            </button>
          </div>
        </div>

        <ul {...fadeUp(0.35)} className={`${classes.stats} ${classes.fadeUp}`}>
          {STATS.map((stat) => (
            <li key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
