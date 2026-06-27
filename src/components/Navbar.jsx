import { useNavigate, NavLink, useLocation } from "react-router-dom";
import classes from "./Navbar.module.css";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryData } from "../utility/galleryData";
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
  const location = useLocation();
  const navigate = useNavigate();

  const isHomeOrGallery =
    location.pathname === "/" || location.pathname.startsWith("/Galerija");

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

  function closeMobileMenu() {
    setMobileOpen(false);
    setIsHovered(false);
  }

  async function scrollHomeTop() {
    const target = document.getElementById("home");

    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    await navigate("/");
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.error("Navigation error:", error);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <nav
      className={`${
        isHomeOrGallery && !scrolled ? classes.transparentNav : classes.solidNav
      } ${scrolled ? classes.scrolledNav : ""}`}
    >
      <div className={classes.navContainer}>
        <img
          src="/logonav.jpg"
          alt="Logo"
          className={classes.navbarLogo}
          onClick={(e) => {
            e.preventDefault();
            scrollHomeTop();
            closeMobileMenu();
          }}
        />

        <button
          className={classes.hamburger}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>

        <ul
          className={`${classes.navbarLinks} ${
            mobileOpen ? classes.mobileActive : ""
          }`}
        >
          <NavLink
            to="/"
            onClick={(e) => {
              e.preventDefault();
              scrollHomeTop();
              closeMobileMenu();
            }}
          >
            Početna
          </NavLink>

          <NavLink
            to="/#o-nama"
            onClick={(e) => {
              e.preventDefault();

              const target = document.getElementById("o-nama");

              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              } else {
                navigate("/#o-nama");
              }

              closeMobileMenu();
            }}
          >
            O nama
          </NavLink>

          <NavLink
            to="/#kontakt"
            onClick={(e) => {
              e.preventDefault();

              const target = document.getElementById("kontakt");

              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              } else {
                navigate("/#kontakt");
              }

              closeMobileMenu();
            }}
          >
            Kontakt
          </NavLink>

          <div
            className={classes.dropdownWrapper}
            onClick={(e) => e.preventDefault()}
          >
            <motion.div
              onClick={handleHover}
              className={classes.dropdownContainer}
            >
              Galerija
              <ArrowIcon isOpen={isHovered} />
            </motion.div>

            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className={classes.dropdown}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {galleryData.map((item, index) => (
                    <li key={index}>
                      <NavLink
                        to={`/Galerija/${item.title}`}
                        onClick={closeMobileMenu}
                      >
                        {item.title}
                      </NavLink>
                    </li>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ul>
      </div>
    </nav>
  );
}
