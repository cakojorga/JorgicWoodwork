"use client";

import { useRouter } from "next/navigation";
import { scrollToElement, scrollToTop } from "../utility/smoothScroll";

// Shared scroll helpers for Navbar, Footer, Hero and CTAs.
// If the section isn't on the current page, navigate home first;
// HashScroll on the home page then scrolls to the #hash.
export function useScrollToSection() {
  const router = useRouter();

  function scrollToSection(id) {
    const target = document.getElementById(id);
    if (target) {
      scrollToElement(target);
    } else {
      router.push(`/#${id}`);
    }
  }

  function scrollHomeTop() {
    if (document.getElementById("home")) {
      scrollToTop();
    } else {
      router.push("/");
    }
  }

  return { scrollToSection, scrollHomeTop };
}
