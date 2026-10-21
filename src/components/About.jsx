"use client";

import classes from "./About.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiTool } from "react-icons/fi";
import { HiArrowRight } from "react-icons/hi2";
import { MdDesignServices, MdOutlineWorkspacePremium } from "react-icons/md";
import { galleryData, galleryPath } from "../utility/galleryData";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};



const WHY_US = [
  {
    title: "Precizna izrada",
    text: "Uz pažnju na detalje i čiste završne obrade.",
    Icon: FiTool,
  },
  {
    title: "Dizajn po Vašoj mjeri",
    text: "Funkcionalno, dugotrajno i vizuelno skladno.",
    Icon: MdDesignServices,
  },
  {
    title: "Iskustvo 30+ godina",
    text: "Izrada namještaja i stolarije u Banja Luci i okolini.",
    Icon: MdOutlineWorkspacePremium,
  },
];

export default function About() {

  return (
    <>
      <section
        className={classes.about}
        id="o-nama"
        aria-labelledby="o-nama-title"
      >
        <div className="container">
          <div className={classes.header} id="o-nama-header">
            <h2 id="o-nama-title" className={classes.title}>
              O nama
            </h2>
            <p className={classes.lead}>
              Jorgić Woodwork je stolarska radionica iz Banja Luke koja već više
              od 30 godina izrađuje stolariju i namještaj po mjeri — precizno,
              trajno i estetski.
            </p>
            <div className={classes.line} aria-hidden="true"></div>
          </div>
          <div className={classes.aboutContent}>
            <div className={classes.text}>
              <h3 className={classes.subTitle}>Naše Usluge</h3>
              <p className={classes.lead}>
                Klikni na kategoriju da vidiš primjere naših radova i pronađeš
                inspiraciju za svoj projekat.
              </p>
              <motion.ul
                className={classes.itemBoard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
              >
                {galleryData.map((item) => (
                  <motion.li key={item.id} variants={itemVariants}>
                    <Link href={galleryPath(item)} className={classes.link}>
                      <span className={classes.cardMedia}>
                        {/* Photo and its tint zoom together as one layer */}
                        <span className={classes.cardZoom}>
                          <img
                            src={item.cover.src}
                            width={item.cover.width}
                            height={item.cover.height}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className={classes.cardImage}
                            style={{ objectPosition: item.coverPosition }}
                          />
                        </span>
                        <span className={classes.cardIcon} aria-hidden="true">
                          <item.icon />
                        </span>
                      </span>
                      <span className={classes.cardBody}>
                        <span className={classes.cardTitle}>{item.title}</span>
                        <span className={classes.cardText}>{item.description}</span>
                        <span className={classes.cardCta} aria-hidden="true">
                          Pogledaj radove
                          <HiArrowRight />
                        </span>
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
          <div className={classes.line} aria-hidden="true"></div>
          <div className={classes.whyUs}>
            <motion.ul
              className={classes.highlights}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
            >
              {WHY_US.map(({ title, text, Icon }, i) => (
                <motion.li
                  key={title}
                  variants={itemVariants}
                  className={classes.highlightItem}
                >
                  <div className={classes.highlightTop}>
                    <span className={classes.highlightIcon} aria-hidden="true">
                      <Icon />
                    </span>
                    <span className={classes.highlightNumber} aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className={classes.highlightTitle}>{title}</h3>
                  <p className={classes.highlightText}>{text}</p>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={itemVariants}
              className={classes.note}
            >
              Radimo po mjeri i dogovoru — od savjetovanja, mjerenja i prijedloga
              rješenja, do izrade i montaže.
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
