"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./Navbar.module.css";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryData, galleryPath } from "../utility/galleryData";
import { useScrollToSection } from "../hooks/useScrollToSection";
import { lockScroll, unlockScroll } from "../utility/smoothScroll";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const ArrowIcon = ({ isOpen }) => {
  return (
    <motion.svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <path d="M6 9l6 6 6-6" />
    </motion.svg>
  );
};

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollToSection, scrollHomeTop } = useScrollToSection();

  const isHomeOrGallery =
    pathname === "/" || pathname.startsWith("/galerija");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleHover() {
    setIsHovered((prev) => !prev);
  }

  function handleLeaveHover() {
    setIsHovered(false)
  }

  // Unlock synchronously, before any scroll: a stopped Lenis ignores scrollTo
  function closeMobileMenu() {
    if (mobileOpen) unlockScroll();
    setMobileOpen(false);
    setIsHovered(false);
  }

  function toggleMobileMenu() {
    if (mobileOpen) {
      closeMobileMenu();
    } else {
      lockScroll();
      setMobileOpen(true);
    }
  }

  // Escape closes the menu; so does widening the window past the mobile layout
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => e.key === "Escape" && closeMobileMenu();
    const desktop = window.matchMedia("(min-width: 901px)");
    const onResize = () => desktop.matches && closeMobileMenu();
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  });

  function goToSection(id) {
    return (e) => {
      e.preventDefault();
      closeMobileMenu();
      scrollToSection(id);
    };
  }

  function goHome(e) {
    e.preventDefault();
    closeMobileMenu();
    scrollHomeTop();
  }

  return (
    <nav
      className={`${
        isHomeOrGallery && !scrolled ? classes.transparentNav : classes.solidNav
      } ${scrolled ? classes.scrolledNav : ""} ${mobileOpen ? classes.menuOpen : ""}`}
    >
      <div className={classes.navContainer}>
        <Link href="/" onClick={goHome} className={classes.logoLink}>
          <img
            src="/logonav.jpg"
            alt="Jorgić Woodwork – početna"
            className={classes.navbarLogo}
          />
        </Link>

        <button
          className={classes.hamburger}
          onClick={toggleMobileMenu}
          aria-label={mobileOpen ? "Zatvori meni" : "Otvori meni"}
          aria-expanded={mobileOpen}
          aria-controls="main-menu"
        >
          {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>

        <ul
          id="main-menu"
          data-lenis-prevent
          className={`${classes.navbarLinks} ${
            mobileOpen ? classes.mobileActive : ""
          }`}
        >
          {/* <li> with display: contents keeps the list valid without changing the layout */}
          <li className={classes.menuItem}>
            <Link href="/" onClick={goHome}>
              Početna
            </Link>
          </li>

          <li className={classes.menuItem}>
            <Link href="/#o-nama" onClick={goToSection("o-nama")}>
              O nama
            </Link>
          </li>

          <li className={classes.menuItem}>
            <Link href="/#kontakt" onClick={goToSection("kontakt")}>
              Kontakt
            </Link>
          </li>

          <li
            className={classes.dropdownWrapper}
            onClick={(e) => e.preventDefault()}
          >
            <motion.button
              type="button"
              onClick={handleHover}
              className={classes.dropdownContainer}
              aria-expanded={isHovered}
              aria-controls="gallery-menu"
            >
              Galerija
              <ArrowIcon isOpen={isHovered} />
            </motion.button>

            <AnimatePresence>
              {isHovered && (
                <motion.ul
                  id="gallery-menu"
                  className={classes.dropdown}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  onMouseLeave={handleLeaveHover}
                >
                  {galleryData.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={galleryPath(item)}
                        onClick={closeMobileMenu}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        </ul>
      </div>
    </nav>
  );
}
