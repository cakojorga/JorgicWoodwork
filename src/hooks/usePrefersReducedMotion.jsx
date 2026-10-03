"use client";

import { useEffect, useState } from "react";

// Like framer-motion's useReducedMotion, but always `false` on the server and
// during hydration, then updated after mount. Use it for anything that ends up
// in className/markup: React does not patch mismatched attributes after
// hydration, so reading the media query during the first render would leave
// the server's markup in place.
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}
