"use client";

import { useId, useState } from "react";
import classes from "./Faq.module.css";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";
import { faqs } from "../utility/faqData";
import { useScrollToSection } from "../hooks/useScrollToSection";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
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
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Faq() {
  // First question starts open so the section never looks empty
  const [openIndex, setOpenIndex] = useState(0);
  const { scrollToSection } = useScrollToSection();
  const baseId = useId();

  return (
    <section className={classes.faq} id="faq" aria-labelledby="faq-title">
      <div className="container">
        <div className={classes.faqContent}>
          <div className={classes.intro}>
            <p className={classes.eyebrow}>Pitanja i odgovori</p>
            <h2 id="faq-title" className={classes.title}>
              Često postavljana <span>pitanja</span>
            </h2>
            <p className={classes.lead}>
              Sve što obično pitaju prije početka saradnje. Ako ne nađete
              odgovor, javite nam se direktno.
            </p>
            <button
              type="button"
              className={classes.contactLink}
              onClick={() => scrollToSection("kontakt")}
            >
              Postavite pitanje
              <HiArrowRight aria-hidden="true" />
            </button>
          </div>

          <motion.ul
            className={classes.list}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {faqs.map((faq, index) => {
              const open = openIndex === index;
              const buttonId = `${baseId}-q${index}`;
              const panelId = `${baseId}-a${index}`;

              return (
                <motion.li
                  key={faq.question}
                  variants={itemVariants}
                  className={`${classes.item} ${open ? classes.open : ""}`}
                >
                  <h3 className={classes.question}>
                    <button
                      type="button"
                      id={buttonId}
                      className={classes.trigger}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? -1 : index)}
                    >
                      <span className={classes.number} aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={classes.questionText}>{faq.question}</span>
                      <span className={classes.toggle} aria-hidden="true" />
                    </button>
                  </h3>

                  {/* Answers stay in the HTML (search engines, FAQ schema); closed ones are inert */}
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={classes.panel}
                    inert={!open}
                  >
                    <div className={classes.panelInner}>
                      <p className={classes.answer}>{faq.answer}</p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
