import React from "react";
import classes  from"./Footer.module.css";
import { FaInstagram } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { GrLocation } from "react-icons/gr";



export default function Footer() {

  const navigate = useNavigate();

  const aboutHandler = (e) => {
    e.preventDefault();
    const target = document.getElementById("o-nama");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#o-nama");
    }
  };

  const faqHandler = (e) => {
    e.preventDefault();
    const target = document.getElementById("faq");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      
    } else {
      navigate("/#faq");
    }
  };

  const pocetnaHandler = (e) => {
    e.preventDefault();
    const target = document.getElementById("home"); 
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className={classes.footer}>
      <div className={classes.footerContainer}>
        <div className={classes.footerBrand}>
          <img
            src="/logonav.webp"
            alt="Logo"
            className={classes.footerLogo}
            onClick={pocetnaHandler}
          />

          <div className={classes.socials}>
            <a
              href="https://www.instagram.com/jorgic_woodwork/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="tel:+38766531274"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LuPhone />
            </a>
            <a
              href="mailto:info@jorgicwoodwork.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MdOutlineMail />
            </a>
          </div>
        </div>

        <div className={classes.footerLinks}>
          <h4>Brzi Linkovi</h4>
          <button onClick={pocetnaHandler}>Početna</button>
          <button onClick={aboutHandler}>O nama</button>
          <button onClick={faqHandler}>FAQ</button>
        </div>

        <div className={classes.footerLinks}>
          <h4>Informacije</h4>
          <Link to="/uslovi-koriscenja">Uslovi korišćenja</Link>
          <Link to="/privatnost">Privatnost</Link>
        </div>
        <div className={classes.footerLinks}>
          <h4>Kontakt</h4>
          <a href="https://maps.app.goo.gl/FJtjCJqRa6UcNHvW6" target="_blank">
            <GrLocation className={classes.contactIcon} /> Bistrica BB
          </a>
          <a href="mailto:info@jorgicwoodwork.com" target="_blank">
            <MdOutlineMail className={classes.contactIcon} />{" "}
            info@jorgicwoodwork.com
          </a>
          <a href="tel:+38765564232" target="_blank">
            <LuPhone className={classes.contactIcon} /> +387 65 564 232
          </a>
          <a href="tel:+38766531274" target="_blank">
            <LuPhone className={classes.contactIcon} /> +387 66 531 274
          </a>
        </div>
      </div>

      <div className={classes.footerBottom}>
        <p>
          © {new Date().getFullYear()} Jorgić Woodwork. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
