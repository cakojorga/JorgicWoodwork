"use client";

import { useEffect } from "react";
import { scrollToElement } from "../utility/smoothScroll";

// Links like /#kontakt from other pages land on the home page;
// scroll to that section once it has been painted.
export default function HashScroll() {
  useEffect(() => {
    const { hash } = window.location;
    if (!hash) return;
    const timer = setTimeout(() => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) scrollToElement(target);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
