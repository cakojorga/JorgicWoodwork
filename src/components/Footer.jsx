"use client";

import classes from "./Footer.module.css";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { galleryData, galleryPath } from "../utility/galleryData";
import { useScrollToSection } from "../hooks/useScrollToSection";

export default function Footer() {
  const { scrollToSection, scrollHomeTop } = useScrollToSection();
  const pathname = usePathname();

  const homeLinkHandler = (e) => {
    e.preventDefault();
    scrollHomeTop();
  };

  return (
    <footer className={classes.footer}>
      <div className={classes.footerContainer}>
        <div className={classes.footerBrand}>
          <Link href="/" onClick={homeLinkHandler} className={classes.logoLink}>
            <img
              src="/logonav.webp"
              alt="Jorgić Woodwork – početna"
              className={classes.footerLogo}
            />
          </Link>
          <p className={classes.tagline}>
            Namještaj i stolarija po mjeri iz Banja Luke. Više od 30 godina
            iskustva.
          </p>

          <div className={classes.socials}>
            <a
              href="https://www.instagram.com/jorgic_woodwork/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a href="tel:+38766531274" aria-label="Pozovite nas">
              <LuPhone />
            </a>
            <a href="mailto:dgjorgicbl@gmail.com" aria-label="Pošaljite email">
              <MdOutlineMail />
            </a>
          </div>
        </div>

        <nav className={classes.footerLinks} aria-label="Brzi linkovi">
          <h2>Brzi linkovi</h2>
          <button onClick={scrollHomeTop}>Početna</button>
          <button onClick={() => scrollToSection("o-nama")}>O nama</button>
          <button onClick={() => scrollToSection("faq")}>FAQ</button>
          <button onClick={() => scrollToSection("kontakt")}>
            Zatraži ponudu
          </button>
        </nav>

        <nav
          className={`${classes.footerLinks} ${classes.footerGallery}`}
          aria-label="Galerija radova"
        >
          <h2>Naši radovi</h2>
          <ul className={classes.categoryGrid}>
            {galleryData.map((item) => {
              const Icon = item.icon;
              // Also active on the category's later pages (/galerija/<slug>/2)
              const path = galleryPath(item);
              const active =
                pathname === path || pathname.startsWith(`${path}/`);
              return (
                <li key={item.id}>
                  <Link
                    href={galleryPath(item)}
                    className={`${classes.categoryLink} ${active ? classes.categoryActive : ""}`}
                    aria-current={active ? "page" : undefined}
                  >
                    <Icon className={classes.categoryIcon} aria-hidden="true" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={classes.footerLinks}>
          <h2>Kontakt</h2>
          <a
            href="https://maps.app.goo.gl/FJtjCJqRa6UcNHvW6"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GrLocation className={classes.contactIcon} /> Bistrica BB
          </a>
          <a href="mailto:dgjorgicbl@gmail.com">
            <MdOutlineMail className={classes.contactIcon} />
            dgjorgicbl@gmail.com
          </a>
          <a href="tel:+38765564232">
            <LuPhone className={classes.contactIcon} /> +387 65 564 232
          </a>
          <a href="tel:+38766531274">
            <LuPhone className={classes.contactIcon} /> +387 66 531 274
          </a>
        </div>
      </div>

      <div className={classes.footerBottom}>
        <p>© {new Date().getFullYear()} Jorgić Woodwork. Sva prava zadržana.</p>
        
        <div className={classes.legalLinks}>
          <Link href="/uslovi-koriscenja">Uslovi korišćenja</Link>
          <span aria-hidden="true">·</span>
          <Link href="/privatnost">Privatnost</Link>
          <span aria-hidden="true">·</span>
          <a
            href="https://www.linkedin.com/in/marko-jorgic/"
            target="_blank"
            rel="noopener noreferrer"
            className={classes.credit}
          >
            Izradio
            <FaLinkedin className={classes.creditIcon} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
