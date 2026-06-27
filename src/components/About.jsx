import classes from "./About.module.css";
import { MdOutlineKitchen } from "react-icons/md";
import { BiCabinet } from "react-icons/bi";
import { MdOutlineDoorBack } from "react-icons/md";
import { FaStairs } from "react-icons/fa6";
import { MdOutlineWindow } from "react-icons/md";
import { LuBedDouble } from "react-icons/lu";
import { MdMiscellaneousServices } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiTool } from "react-icons/fi";
import { MdDesignServices } from "react-icons/md";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { FaChild } from "react-icons/fa6";
import { galleryData } from "../utility/galleryData";




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
                <motion.li variants={itemVariants}>
                  <Link
                    to={`/Galerija/${galleryData[0].title}`}
                    className={classes.link}
                  >
                    Kuhinje
                    <span className={classes.icon}>
                      <MdOutlineKitchen />
                    </span>
                  </Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link
                    to={`/Galerija/${galleryData[1].title}`}
                    className={classes.link}
                  >
                    Ormari
                    <span className={classes.icon}>
                      <BiCabinet />
                    </span>
                  </Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link
                    to={`/Galerija/${galleryData[2].title}`}
                    className={classes.link}
                  >
                    Vrata
                    <span className={classes.icon}>
                      <MdOutlineDoorBack />
                    </span>
                  </Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link
                    to={`/Galerija/${galleryData[3].title}`}
                    className={classes.link}
                  >
                    Stepenice
                    <span className={classes.icon}>
                      <FaStairs />
                    </span>
                  </Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link
                    to={`/Galerija/${galleryData[4].title}`}
                    className={classes.link}
                  >
                    Prozori
                    <span className={classes.icon}>
                      <MdOutlineWindow />
                    </span>
                  </Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link
                    to={`/Galerija/${galleryData[5].title}`}
                    className={classes.link}
                  >
                    Dječije Sobe
                    <span className={classes.icon}>
                      <FaChild />
                    </span>
                  </Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link
                    to={`/Galerija/${galleryData[6].title}`}
                    className={classes.link}
                  >
                    Kreveti
                    <span className={classes.icon}>
                      <LuBedDouble />
                    </span>
                  </Link>
                </motion.li>
                <motion.li variants={itemVariants}>
                  <Link
                    to={`/Galerija/${galleryData[7].title}`}
                    className={classes.link}
                  >
                    Ostali stolarski radovi
                    <span className={classes.icon}>
                      <MdMiscellaneousServices />
                    </span>
                  </Link>
                </motion.li>
              </motion.ul>
            </div>
          </div>
          <div className={classes.line} aria-hidden="true"></div>
          <div className={classes.whyUs}>
            <h3 className={classes.subTitle}>Zašto Jorgić Woodwork</h3>
            <motion.ul
              className={classes.highlights}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
            >
              <motion.li
                variants={itemVariants}
                className={classes.highlightItemLeft}
              >
                <span>Precizna izrada</span>
                <FiTool className={classes.highlightIcon} />
                <p className={classes.highlightText}>
                  <span> Uz pažnju na detalje i čiste završne obrade.</span>
                </p>
              </motion.li>
              <motion.li
                variants={itemVariants}
                className={classes.highlightItemCenter}
              >
                <span>Dizajn po vašoj mjeri</span>
                <MdDesignServices className={classes.highlightIcon} />
                <p className={classes.highlightText}>
                  <span>Funkcionalno, dugotrajno i vizuelno skladno.</span>
                </p>
              </motion.li>
              <motion.li
                variants={itemVariants}
                className={classes.highlightItemRight}
              >
                <span className={classes.highlightTextHeader}>
                  Iskustvo 30+ godina
                </span>
                <MdOutlineWorkspacePremium className={classes.highlightIcon} />
                <p className={classes.highlightText}>
                  <span>
                    Izrada namještaja i stolarije u Banja Luci i okolini.
                  </span>
                </p>
              </motion.li>
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
