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

export default function About() {
  return (
    <section
      className={classes.about}
      id="o-nama"
      aria-labelledby="o-nama-title"
    >
      <div className="container">
        <header className={classes.header}>
          <h2 id="o-nama-title" className={classes.title}>
            O nama
          </h2>
          <p className={classes.lead}>
            Jorgić Woodwork je stolarska radionica iz Banja Luke koja već više
            od 30 godina izrađuje stolariju i namještaj po mjeri — precizno,
            trajno i estetski.
          </p>
          <div className={classes.line} aria-hidden="true"></div>
        </header>
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

            <h3 className={classes.subTitle}>Zašto Jorgić Woodwork</h3>
            <ul className={classes.highlights}>
              <li className={classes.highlightItem}>
                <strong>Precizna izrada</strong> uz pažnju na detalje i čiste
                završne obrade.
              </li>
              <li className={classes.highlightItem}>
                <strong>Kvalitetni materijali</strong> i provjerena okovska
                rješenja za dug vijek trajanja.
              </li>
              <li className={classes.highlightItem}>
                <strong>Dizajn po vašoj mjeri</strong> — funkcionalno,
                dugotrajno i vizuelno skladno.
              </li>
              <li className={classes.highlightItem}>
                <strong>Iskustvo 30+ godina</strong> u izradi namještaja i
                stolarije u Banja Luci i okolini.
              </li>
            </ul>

            <div className={classes.note}>
              Radimo po mjeri i dogovoru — od savjetovanja, izmjere i prijedloga
              rješenja, do izrade i montaže.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}