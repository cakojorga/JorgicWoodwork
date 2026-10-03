"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { haltSmoothScroll, startSmoothScroll } from "../utility/smoothScroll";

// Starts Lenis once for the whole app (see utility/smoothScroll.jsx)
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    startSmoothScroll();
  }, []);

  // On every page change, cancel any scroll still gliding from the previous
  // page. Layout effect: runs right after the new page is committed, before
  // Lenis gets another animation frame to pull the page back down.
  useLayoutEffect(() => {
    haltSmoothScroll();
  }, [pathname]);

  return null;
}
