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
                Da li izrađujete namještaj po mjeri?
              </h3>

              <p className={classes.answer}>
                Da, izrađujemo kuhinje, plakare, vrata, stepenice,
                krevete i ostale proizvode potpuno prilagođene
                vašem prostoru i željama.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariantsRight}
              className={classes.faqItem}
            >
              <h3 className={classes.question}>
                Da li vršite izlazak na teren i mjerenje?
              </h3>

              <p className={classes.answer}>
                Da, dolazimo na adresu radi mjerenja prostora,
                savjetovanja oko izbora materijala i izrade ponude, kako bismo
                osigurali da finalni proizvod savršeno odgovara vašem prostoru.
              </p>
            </motion.div>

            <motion.div variants={itemVariantsLeft} className={classes.faqItem}>
              <h3 className={classes.question}>
                Koliko traje izrada namještaja?
              </h3>

              <p className={classes.answer}>
                Vrijeme izrade zavisi od složenosti projekta i obima posla. U
                prosjeku, izrada traje od 2 do 6 sedmica, a tačan rok dogovaramo
                prilikom potvrde narudžbe.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariantsRight}
              className={classes.faqItem}
            >
              <h3 className={classes.question}>
                Da li nudite dostavu i montažu?
              </h3>

              <p className={classes.answer}>
                Da, nakon završene izrade radimo dostavu i 
                montažu kako biste dobili završen proizvod spreman za
                korištenje.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
