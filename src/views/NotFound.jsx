import Link from "next/link";
import classes from "./ErrorPage.module.css";

export default function NotFound({ message = "Nepostojeća stranica" }) {
  return (
    <div className="container">
      <div className={classes.containerError}>
        <h1>{message}</h1>
        <p>Stranica koju tražite ne postoji ili je premještena.</p>
        <Link href="/" className={classes.homeLink}>
          Nazad na početnu
        </Link>
      </div>
    </div>
  );
}
