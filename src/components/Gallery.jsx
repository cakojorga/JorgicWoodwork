"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { useSwipeable } from "react-swipeable";
import Link from "next/link";
import { HiArrowUpRight, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import classes from "./Gallery.module.css";
import { highlights } from "../utility/highlightsData";
import { galleryData, galleryPath } from "../utility/galleryData";

const INTERVAL = 6000; // ms each slide stays on screen
const SIZES = "(max-width: 1132px) 100vw, 1100px";
const pad = (n) => String(n).padStart(2, "0");

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const reduceMotion = useReducedMotion();
  const stageRef = useRef(null);

  const count = highlights.length;
  const slide = highlights[index];
  const category = galleryData.find((item) => item.slug === slide.category);

  // Autoplay is driven by the progress bar's CSS animation (see onAnimationEnd),
  // so pausing it also pauses the timer at the exact same point.
  // className depends on this, so it must match the server render (see hook)
  const autoplay = !usePrefersReducedMotion();
  const paused = hovered || !inView || !tabVisible;

  const next = () => setIndex((i) => (i + 1) % count);
  const prev = () => setIndex((i) => (i - 1 + count) % count);

  // Only run while the slider is actually on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Warm the cache for the next slide so the crossfade never waits on the network
  useEffect(() => {
    if (!inView) return;
    const upcoming = highlights[(index + 1) % count];
    const img = new Image();
    img.sizes = SIZES;
    img.srcset = upcoming.srcSet;
    img.src = upcoming.src;
  }, [index, inView, count]);

  // useSwipeable hands back its own ref, which has to share the element with ours
  const { ref: swipeRef, ...swipeHandlers } = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    preventScrollOnSwipe: true,
    trackMouse: false,
  });

  const setStageRef = (el) => {
    stageRef.current = el;
    swipeRef(el);
  };

  return (
    // Same initial values on server and client; MotionConfig drops the zoom
    // for visitors who prefer reduced motion.
    <MotionConfig reducedMotion="user">
    <section
      id="gallery"
      className={classes.section}
      aria-labelledby="gallery-title"
      aria-roledescription="carousel"
    >
      <div className={classes.header}>
        <h2 id="gallery-title" className={classes.title}>
          Izdvojeni radovi
        </h2>
        <p className={classes.lead}>
          Izbor projekata na koje smo posebno ponosni. Kliknite na fotografiju
          i pogledajte cijelu kategoriju.
        </p>
        <div className={classes.line} aria-hidden="true"></div>
      </div>

      <div
        ref={setStageRef}
        className={classes.stage}
        {...swipeHandlers}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.id}
            className={classes.slide}
            initial={{ opacity: 0, zIndex: 2 }}
            animate={{ opacity: 1, zIndex: 2 }}
            // Keep the old slide underneath until the new one has faded in
            exit={{ opacity: 0, zIndex: 1, transition: { duration: 0.3, delay: 0.9 } }}
            transition={{ duration: reduceMotion ? 0.3 : 1, ease: [0.4, 0, 0.2, 1] }}
          >
            <Link
              href={galleryPath(category)}
              className={classes.slideLink}
              aria-label={`${slide.alt} – pogledajte kategoriju ${category.title}`}
              draggable={false}
            >
              <motion.img
                src={slide.src}
                srcSet={slide.srcSet}
                sizes={SIZES}
                alt=""
                className={classes.image}
                draggable={false}
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: INTERVAL / 1000 + 1.5, ease: "easeOut" }}
              />
            </Link>
          </motion.div>
        </AnimatePresence>

        <div className={classes.vignette} aria-hidden="true"></div>

        <button
          type="button"
          className={`${classes.navButton} ${classes.prev}`}
          onClick={prev}
          aria-label="Prethodni rad"
        >
          <HiChevronLeft />
        </button>
        <button
          type="button"
          className={`${classes.navButton} ${classes.next}`}
          onClick={next}
          aria-label="Sljedeći rad"
        >
          <HiChevronRight />
        </button>

        <span className={classes.cta} aria-hidden="true">
          <span className={classes.ctaText}>Pogledajte galeriju</span>
          <HiArrowUpRight />
        </span>

        <div className={classes.bottomBar}>
          <span className={classes.counter} aria-live="polite">
            <strong>{pad(index + 1)}</strong> / {pad(count)}
          </span>
          <div className={classes.dots}>
            {highlights.map((item, i) => (
              <button
                key={item.id}
                type="button"
                className={`${classes.dot} ${i < index ? classes.dotDone : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Rad ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
              >
                {i === index && (
                  <span
                    key={slide.id}
                    className={`${classes.fill} ${autoplay ? classes.fillRunning : classes.fillStatic}`}
                    style={{
                      animationDuration: `${INTERVAL}ms`,
                      animationPlayState: paused ? "paused" : "running",
                    }}
                    onAnimationEnd={next}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
    </MotionConfig>
  );
}
