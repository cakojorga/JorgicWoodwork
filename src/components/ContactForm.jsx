import classes from "./ContactForm.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope } from "react-icons/fa";
import { IoPersonSharp, IoChatbox } from "react-icons/io5";

const INITIAL_STATE = {
  name: "",
  phone: "",
  email: "",
  message: "",
  consent: false,
};

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Live-clear the error for the field the user is fixing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Pure JS validation — runs even if the attacker removes `required`
  // attributes from the DOM via DevTools.
  const validate = (data) => {
    const errs = {};
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRe = /^[\d\s+\-()/.]{6,20}$/;

    if (!data.name.trim()) {
      errs.name = "Ime i prezime su obavezni.";
    } else if (data.name.trim().length < 2) {
      errs.name = "Unesite puno ime i prezime.";
    }

    if (!data.phone.trim()) {
      errs.phone = "Broj telefona je obavezan.";
    } else if (!phoneRe.test(data.phone.trim())) {
      errs.phone = "Unesite validan broj telefona.";
    }

    if (!data.email.trim()) {
      errs.email = "Email je obavezan.";
    } else if (!emailRe.test(data.email.trim())) {
      errs.email = "Unesite validnu email adresu.";
    }

    if (!data.message.trim()) {
      errs.message = "Poruka je obavezna.";
    } else if (data.message.trim().length < 5) {
      errs.message = "Poruka mora imati najmanje 5 karaktera.";
    }

    if (!data.consent) {
      errs.consent =
        "Morate prihvatiti Uslove korišćenja i Politiku privatnosti.";
    }

    return errs;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("");

    // Always validate from state — never trust DOM attributes.
    const errs = validate(form);
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      setResult("Molimo ispravite označena polja prije slanja.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Construct the payload from validated state — not from DOM FormData —
      // so that removing `required` attributes or editing inputs via console
      // cannot bypass validation.
      const payload = new FormData();
      payload.append("name", form.name.trim());
      payload.append("phone", form.phone.trim());
      payload.append("email", form.email.trim());
      payload.append("message", form.message.trim());
      payload.append(
        "consent",
        "Korisnik je prihvatio Uslove korišćenja i Politiku privatnosti."
      );
      payload.append("access_key", "45dce0e1-7970-4337-aacb-31116e99c2ab");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });

      const data = await response.json();
      if (data.success) {
        setResult("Hvala vam na poruci!");
        setForm(INITIAL_STATE);
        setErrors({});
      } else {
        setResult("Neuspješno slanje poruke. Pokušajte ponovo.");
      }
    } catch (error) {
      setResult("Došlo je do greške. Pokušajte ponovo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className={classes.contactForm}>
      <div className={classes.formGroup}>
        <label htmlFor="name">
          <IoPersonSharp />
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Ime i Prezime"
          aria-invalid={!!errors.name}
          autoComplete="name"
        />
      </div>
      {errors.name && <p className={classes.fieldError}>{errors.name}</p>}

      <div className={classes.formGroup}>
        <label htmlFor="phone">
          <FaPhone />
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Broj Telefona"
          aria-invalid={!!errors.phone}
          autoComplete="tel"
        />
      </div>
      {errors.phone && <p className={classes.fieldError}>{errors.phone}</p>}

      <div className={classes.formGroup}>
        <label htmlFor="email">
          <FaEnvelope />
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          aria-invalid={!!errors.email}
          autoComplete="email"
        />
      </div>
      {errors.email && <p className={classes.fieldError}>{errors.email}</p>}

      <div className={classes.formGroup}>
        <label htmlFor="message">
          <IoChatbox />
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Poruka"
          aria-invalid={!!errors.message}
        ></textarea>
      </div>
      {errors.message && <p className={classes.fieldError}>{errors.message}</p>}

      <div className={classes.consentGroup}>
        <input
          type="checkbox"
          id="consent"
          name="consent"
          checked={form.consent}
          onChange={handleChange}
          aria-invalid={!!errors.consent}
          className={classes.consentCheckbox}
        />
        <label htmlFor="consent" className={classes.consentLabel}>
          <div>
            Slažem se sa&nbsp;
            <Link
              to="/uslovi-koriscenja"
              target="_blank"
              rel="noopener noreferrer"
            >
              Uslovima korišćenja
            </Link>
            &nbsp;i&nbsp;
          </div>
          <span>
            <Link to="/privatnost" rel="noopener noreferrer">
              Politikom privatnosti
            </Link>
          </span>
        </label>
      </div>
      {errors.consent && <p className={classes.fieldError}>{errors.consent}</p>}

      <button
        type="submit"
        className={classes.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Slanje..." : "Pošalji"}
      </button>
      <p className={classes.result}>{result}</p>
    </form>
  );
}
