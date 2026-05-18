import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ScrollRestoration } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
        <main>
          <ScrollRestoration />
          <Navbar />

          <Outlet />
          <Footer />
        </main>
    </>
  );
}
