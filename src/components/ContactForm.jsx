import classes from "./ContactForm.module.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { IoPersonSharp, IoChatbox } from "react-icons/io5";

export default function ContactForm() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "45dce0e1-7970-4337-aacb-31116e99c2ab");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data.success ? "Success!" : "Error");
  };

  return (
    <form onSubmit={onSubmit} className={classes.contactForm}>
      <div className={classes.formGroup}>
        <label htmlFor="name">
          <IoPersonSharp />
        </label>
        <input type="text" id="name" name="name" required placeholder="Ime i Prezime"/>
      </div>
      <div className={classes.formGroup}>
        <label htmlFor="phone">
          <FaPhone />
        </label>
        <input
          type="text"
          id="phone"
          name="phone"
          required
          placeholder="Broj Telefona"
        />
      </div>
      <div className={classes.formGroup}>
        <label htmlFor="email">
          <FaEnvelope />
        </label>
        <input type="email" id="email" name="email" required placeholder="Email"/>
      </div>
      <div className={classes.formGroup}>
        <label htmlFor="message">
          <IoChatbox />
        </label>
        <textarea id="message" name="message" required placeholder="Poruka"></textarea>
      </div>
      <button type="submit" className={classes.submitButton}>
        Pošalji
      </button>
      <p>{result}</p>
    </form>
  );
}
