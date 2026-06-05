import classes from "./Faq.module.css";
import { motion } from "framer-motion";

export default function Faq() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariantsLeft = {
    hidden: {
      opacity: 0,
      x: -40,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const itemVariantsRight = {
    hidden: {
      opacity: 0,
      x: 40,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className={classes.faq} id="faq" aria-labelledby="faq-title">
      <div className="container">
        <div className={classes.faqContent}>
          <h2 id="faq-title" className={classes.title}>
            Često postavljana pitanja
          </h2>

          <motion.div
            className={classes.faqGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div variants={itemVariantsLeft} className={classes.faqItem}>
              <h3 className={classes.question}>
                Koje vrste materijala koristite?
              </h3>

              <p className={classes.answer}>Drvo</p>
            </motion.div>

            <motion.div
              variants={itemVariantsRight}
              className={classes.faqItem}
            >
              <h3 className={classes.question}>
                Koje vrste materijala koristite?
              </h3>

              <p className={classes.answer}>Drvo</p>
            </motion.div>

            <motion.div variants={itemVariantsLeft} className={classes.faqItem}>
              <h3 className={classes.question}>
                Koje vrste materijala koristite?
              </h3>

              <p className={classes.answer}>Drvo</p>
            </motion.div>

            <motion.div
              variants={itemVariantsRight}
              className={classes.faqItem}
            >
              <h3 className={classes.question}>
                Koje vrste materijala koristite?
              </h3>

              <p className={classes.answer}>Drvo</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
