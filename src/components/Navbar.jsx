import { useNavigate, NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ArrowIcon = ({ isOpen }) => {
  return (
    <motion.svg
      width="24"
      height="24"
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
  const Navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // start shrinking after 50px
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleHover() {
    setIsHovered((prev) => !prev);
  }

  return (
    <nav className={`${scrolled ? classes.scrolledNav : ""} ${classes.navbar}`}>
      <div className={classes.navContainer}>
        <img
          src="/logonav.webp"
          alt="Logo"
          className={`${scrolled ? classes.scrolled : ""} ${classes.navbarLogo}`}
          onClick={(e) => {
            e.preventDefault();
            const target = document.getElementById("home");
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            } else {
              Navigate("/");
            }
          }}
        />

        <ul className={classes.navbarLinks}>
          <NavLink
            to="/"
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById("home");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              } else {
                Navigate("/");
              }
            }}
          >
            Početna
          </NavLink>
          <NavLink
            to="/#kontakt"
            onClick={(e) => {
              e.preventDefault();
              const target = document.getElementById("kontakt");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              } else {
                Navigate("/#kontakt");
              }
            }}
          >
            Kontakt
          </NavLink>
          <NavLink
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <motion.div
              onClick={handleHover}
              className={classes.dropdownContainer}
            >
              Galerija
              <ArrowIcon isOpen={isHovered} />
              {isHovered && (
                <motion.div
                  className={classes.dropdown}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <li>
                    <NavLink to="/galerija/1">Kuhinje</NavLink>
                  </li>
                  <li>
                    <NavLink to="/galerija/2">Ormani</NavLink>
                  </li>
                  <li>
                    <NavLink to="/galerija/2">Vrata</NavLink>
                  </li>
                  <li>
                    <NavLink to="/galerija/2">Djecije Sobe</NavLink>
                  </li>
                  <li>
                    <NavLink to="/galerija/2">Stepenice</NavLink>
                  </li>
                  <li>
                    <NavLink to="/galerija/2">Prozori</NavLink>
                  </li>
                </motion.div>
              )}
            </motion.div>
          </NavLink>
        </ul>
      </div>
    </nav>
  );
}
