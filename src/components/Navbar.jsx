"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./Navbar.module.css";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryData, galleryPath } from "../utility/galleryData";
import { useScrollToSection } from "../hooks/useScrollToSection";
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

  function closeMobileMenu() {
    setMobileOpen(false);
    setIsHovered(false);
  }

  function goToSection(id) {
    return (e) => {
      e.preventDefault();
      scrollToSection(id);
      closeMobileMenu();
    };
  }

  function goHome(e) {
    e.preventDefault();
    scrollHomeTop();
    closeMobileMenu();
  }

  return (
    <nav
      className={`${
        isHomeOrGallery && !scrolled ? classes.transparentNav : classes.solidNav
      } ${scrolled ? classes.scrolledNav : ""}`}
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
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Zatvori meni" : "Otvori meni"}
          aria-expanded={mobileOpen}
          aria-controls="main-menu"
        >
          {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>

        <ul
          id="main-menu"
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
