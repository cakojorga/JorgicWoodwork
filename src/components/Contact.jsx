import classes from "./Contact.module.css";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section
      className={classes.contact}
      id="kontakt"
      aria-labelledby="kontakt-title"
    >
      <div className="container">
        <header className={classes.title}>
          <h2 id="kontakt-title">Zatražite Ponudu</h2>
        </header>
        <div className={classes.contactContent}>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
