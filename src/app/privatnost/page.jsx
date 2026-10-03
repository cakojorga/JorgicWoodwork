import Privatnost from "../../views/Privatnost";
import { pageMetadata } from "../../lib/metadata";

export const metadata = pageMetadata({
  title: "Politika privatnosti",
  description:
    "Kako Jorgić Woodwork prikuplja, koristi i čuva lične podatke poslate putem kontakt forme na sajtu jorgicwoodwork.com.",
  path: "/privatnost",
});

export default function PrivatnostPage() {
  return <Privatnost />;
}
