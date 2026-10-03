"use client";

import classes from "./Hero.module.css";
import { HiArrowRight } from "react-icons/hi2";
import { useScrollToSection } from "../hooks/useScrollToSection";

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
      <div className={classes.heroContent}>
        <h1 id="home-title" {...fadeUp(0)} className={`${classes.heroTitle} ${classes.fadeUp}`}>
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
        </h1>

        <p {...fadeUp(0.1)} className={`${classes.heroSubtitle} ${classes.fadeUp}`}>
          Izrada kuhinja, ormara, vrata i namještaja po mjeri u Banjoj Luci i
          okolini. Spoj tradicionalne izrade i modernog dizajna za dugotrajan
          kvalitet.
        </p>

        <div {...fadeUp(0.2)} className={`${classes.btnContainer} ${classes.fadeUp}`}>
          <button
            className={classes.primaryButton}
            onClick={() => scrollToSection("kontakt")}
          >
            Zatraži ponudu
          </button>
          <button
            className={classes.secondaryButton}
            onClick={() => scrollToSection("gallery")}
          >
            Pogledaj radove
            <HiArrowRight className={classes.arrow} aria-hidden="true" />
          </button>
        </div>

        <ul {...fadeUp(0.3)} className={`${classes.stats} ${classes.fadeUp}`}>
          {STATS.map((stat) => (
            <li key={stat.label}>
              <strong>{stat.value}</strong> {stat.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
