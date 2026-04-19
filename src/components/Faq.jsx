import classes from "./Faq.module.css";
import { motion } from "framer-motion";

export default function Faq() { 
  return (
    <section className={classes.faq} id="faq" aria-labelledby="faq-title">
      <div className="container">
        <div className={classes.faqContent}>
          <h2 id="faq-title" className={classes.title}>
            Često postavljana pitanja
          </h2>
          
          <div className={classes.faqGrid}>
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} viewport={{ once: true , amount: 0.5 }} className={classes.faqItem}>
              <h3 className={classes.question}>
                Koje vrste materijala koristite?
              </h3>
              <p className={classes.answer}>Drvo</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} viewport={{ once: true , amount: 0.5 }} className={classes.faqItem}>
              <h3 className={classes.question}>
                Koje vrste materijala koristite?
              </h3>
              <p className={classes.answer}>Drvo</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} viewport={{ once: true , amount: 0.5 }} className={classes.faqItem}>
              <h3 className={classes.question}>
                Koje vrste materijala koristite?
              </h3>
              <p className={classes.answer}>Drvo</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: "easeInOut" }} viewport={{ once: true , amount: 0.5 }} className={classes.faqItem}>
              <h3 className={classes.question}>
                Koje vrste materijala koristite?
              </h3>
              <p className={classes.answer}>Drvo</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}