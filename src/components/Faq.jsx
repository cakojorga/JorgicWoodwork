import classes from "./Faq.module.css";

export default function Faq() { 
  return (
    <section className={classes.faq} id="faq" aria-labelledby="faq-title">
      <div className="container">
        <div className={classes.faqContent}>
          <h2 id="faq-title" className={classes.title}>
            Često postavljana pitanja
          </h2>
          
          <div className={classes.faqGrid}>
            <div className={classes.faqItem}>
              <h3 className={classes.question}>
                Koje vrste materijala koristite?
              </h3>
              <p className={classes.answer}>Drvo</p>
            </div>
            <div className={classes.faqItem}>
              <h3 className={classes.question}>
                Koje vrste materijala koristite?
              </h3>
              <p className={classes.answer}>Drvo</p>
            </div>
            <div className={classes.faqItem}>
              <h3 className={classes.question}>
                Koje vrste materijala koristite?
              </h3>
              <p className={classes.answer}>Drvo</p>
            </div>
            <div className={classes.faqItem}>
              <h3 className={classes.question}>
                Koje vrste materijala koristite?
              </h3>
              <p className={classes.answer}>Drvo</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}