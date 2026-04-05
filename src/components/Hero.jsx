import classes from "./Hero.module.css";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <>
      <div className={classes.overlay} aria-hidden="true"></div>
      <section className={classes.hero}>
        <div className={classes.heroContent}>
          <motion.h1
            className={classes.heroTitle}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Unaprijedite svoj dom
          </motion.h1>

          <motion.p
            className={classes.heroSubtitle}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Izrada kuhinja, ormara, vrata i namještaja po mjeri u Banja Luci i
            okolini. Spoj tradicionalne izrade i modernog dizajna za dugotrajan
            kvalitet.
          </motion.p>

          <motion.div
            className={classes.btnContainer}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <button className={classes.primaryButton}>Zatražite ponudu</button>

            <button className={classes.secondaryButton}>
              Pogledajte galeriju
            </button>
          </motion.div>

          <motion.div
            className={classes.scrollIndicator}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.p className={classes.stats}>
              <span>30+</span> <span className={classes.statsSpan}>Godina Iskustva</span>
            </motion.p>
            <motion.div className={classes.divider} aria-hidden="true"></motion.div>
            <motion.p className={classes.stats}>
              <span>1000+</span> <span className={classes.statsSpan}>Projekata</span>
            </motion.p>
            <motion.div className={classes.divider} aria-hidden="true"></motion.div>
            <motion.p className={classes.stats}>
              <span>500+</span> <span className={classes.statsSpan}>Zadovoljnih Klijenata</span>
            </motion.p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
