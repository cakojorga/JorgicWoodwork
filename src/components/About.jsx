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

export default function About() {
  return (
    <section
      className={classes.about}
      id="o-nama"
      aria-labelledby="o-nama-title"
    >
      <div className="container">
        <div className={classes.header}>
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
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.5 }}
              className={classes.itemBoard}
            >
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <Link to="/galerija" className={classes.link}>
                  Kuhinje
                  <span className={classes.icon}>
                    <MdOutlineKitchen />
                  </span>
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <Link to="/galerija" className={classes.link}>
                  Ormari
                  <span className={classes.icon}>
                    <BiCabinet />
                  </span>
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <Link to="/galerija" className={classes.link}>
                  Vrata
                  <span className={classes.icon}>
                    <MdOutlineDoorBack />
                  </span>
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <Link to="/galerija" className={classes.link}>
                  Stepenice
                  <span className={classes.icon}>
                    <FaStairs />
                  </span>
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <Link to="/galerija" className={classes.link}>
                  Prozori
                  <span className={classes.icon}>
                    <MdOutlineWindow />
                  </span>
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <Link to="/galerija" className={classes.link}>
                  Dječije sobe i kreveti
                  <span className={classes.icon}>
                    <LuBedDouble />
                  </span>
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <Link to="/galerija" className={classes.link}>
                  Ostali stolarski radovi
                  <span className={classes.icon}>
                    <MdMiscellaneousServices />
                  </span>
                </Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                <Link to="/galerija" className={classes.link}>
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
          <ul className={classes.highlights}>
            <motion.li
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className={classes.highlightItemLeft}
            >
              <span>Precizna izrada</span>
              <FiTool className={classes.highlightIcon} />
              <p className={classes.highlightText}>
                <span> Uz pažnju na detalje i čiste završne obrade.</span>
              </p>
            </motion.li>
            {/* <li className={classes.highlightItem}>
            <strong>Kvalitetni materijali</strong> i provjerena okovska rješenja
            za dug vijek trajanja.
          </li>//*/}
            <motion.li
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className={classes.highlightItemCenter}
            >
              <span>Dizajn po vašoj mjeri</span>
              <MdDesignServices className={classes.highlightIcon} />
              <p className={classes.highlightText}>
                <span>Funkcionalno, dugotrajno i vizuelno skladno.</span>
              </p>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className={classes.highlightItemRight}
            >
              <span className={classes.highlightTextHeader}>Iskustvo 30+ godina</span>
              <MdOutlineWorkspacePremium className={classes.highlightIcon} />
              <p className={classes.highlightText}>
                <span>
                  Izrada namještaja i stolarije u Banja Luci i okolini.
                </span>
              </p>
            </motion.li>
          </ul>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5 }} className={classes.note}>
            Radimo po mjeri i dogovoru — od savjetovanja, izmjere i prijedloga
            rješenja, do izrade i montaže.
          </motion.div>
        </div>
      </div>
    </section>
  );
}
