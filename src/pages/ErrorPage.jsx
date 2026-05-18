import { ScrollRestoration } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import classes from "./ErrorPage.module.css";

export default function ErrorPage() {
  return (
    <>
      <main>
        <ScrollRestoration />

        <Navbar />

        <div className="container">
          <div className={classes.containerError}>
            <h1>Nepostojeća stranica</h1>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}