import NotFound from "../views/NotFound";

export const metadata = {
  title: "Stranica nije pronađena",
  robots: { index: false, follow: true },
};

export default function NotFoundPage() {
  return <NotFound />;
}
