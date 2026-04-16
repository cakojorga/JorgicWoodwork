import React from "react";
import classes  from"./Footer.module.css";


export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerContainer}>
        <div className={classes.footerBrand}>
          <img src="/logonav.webp" alt="Logo" className={classes.footerLogo} />
          <p>
            Modern, high-quality solutions crafted with precision and style.
          </p>

          <div className={classes.socials}>
            <a href="#">🌐</a>
            <a href="#">📘</a>
            <a href="#">📸</a>
            <a href="#">🐦</a>
          </div>
        </div>

        <div className={classes.footerLinks}>
          <h4>Company</h4>
          <a href="#">O nama</a>
          <a href="#">Usluge</a>
          <a href="#">Projekti</a>
          <a href="#">Kontakt</a>
        </div>

        <div className={classes.footerLinks}>
          <h4>Support</h4>
          <a href="#">Uslovi korišćenja</a>
          <a href="#">Privatnost</a>
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
