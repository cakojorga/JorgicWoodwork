import UsloviKoriscenja from "../../views/UsloviKoriscenja";
import { pageMetadata } from "../../lib/metadata";

export const metadata = pageMetadata({
  title: "Uslovi korišćenja",
  description: "Uslovi korišćenja internet stranice jorgicwoodwork.com.",
  path: "/uslovi-koriscenja",
});

export default function UsloviKoriscenjaPage() {
  return <UsloviKoriscenja />;
}
