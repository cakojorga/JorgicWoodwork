import classes from "./Contact.module.css";
import ContactForm from "./ContactForm";
import { LuPhone } from "react-icons/lu";
import { business, formatPhone } from "../utility/site";

export default function Contact() {
  return (
    <section
      className={classes.contact}
      id="kontakt"
      aria-labelledby="kontakt-title"
    >
      <div className="container">
        <header className={classes.title}>
          <h2 id="kontakt-title" className={classes.title}>
            Zatraži Ponudu
          </h2>
        </header>
        <div className={classes.contactContent}>
          <ContactForm />

          <div className={classes.callUs}>
            <p className={classes.divider}>
              <span>ili</span>
            </p>
            <p className={classes.callText}>
              Pozovite nas direktno, rado ćemo odgovoriti
              na sva pitanja.
            </p>
            <ul className={classes.phones}>
              {business.phones.map((phone) => (
                <li key={phone}>
                  <a href={`tel:${phone}`} className={classes.phoneLink}>
                    <span className={classes.phoneIcon} aria-hidden="true">
                      <LuPhone />
                    </span>
                    {formatPhone(phone)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
