import Lenis from "lenis";
// lenis/dist/lenis.css is imported in app/layout.js

// One Lenis instance for the whole app. Skipped for visitors who asked
// the OS to reduce motion; every helper below falls back to native scrolling.
let lenis = null;

export function startSmoothScroll() {
  if (lenis || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }
  lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
}

// Cancels a smooth scroll that is still gliding. Called on every page change:
// otherwise the momentum from the previous page carries on after Next.js has
// scrolled the new page to the top, and drags it back down to the old position.
export function haltSmoothScroll() {
  if (!lenis) return;
  lenis.stop(); // also resets Lenis to the real scroll position
  lenis.start();
}

export function stopSmoothScroll() {
  lenis?.destroy();
  lenis = null;
}

// The gap for the sticky navbar comes from CSS scroll-margin-top (App.css),
// which both Lenis and native scrollIntoView respect.
export function scrollToElement(el) {
  if (lenis) {
    // After a route change Lenis still remembers the old page's height and
    // would clamp the target to it, so re-measure first.
    lenis.resize();
    lenis.scrollTo(el);
  } else {
    // No Lenis means reduced motion: jump instead of animating
    el.scrollIntoView();
  }
}

export function scrollToTop({ immediate = false } = {}) {
  if (lenis) {
    lenis.scrollTo(0, { immediate });
  } else {
    window.scrollTo(0, 0);
  }
}

// Modals call these so the page behind them can't scroll
export function lockScroll() {
  lenis?.stop();
  document.body.style.overflow = "hidden";
}

export function unlockScroll() {
  lenis?.start();
  document.body.style.overflow = "";
}
