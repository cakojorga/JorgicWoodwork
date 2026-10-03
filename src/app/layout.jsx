import localFont from "next/font/local";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "lenis/dist/lenis.css";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SmoothScroll from "../components/SmoothScroll";
import JsonLd from "../components/JsonLd";
import { SITE_URL, SITE_NAME } from "../utility/site";
import { businessSchema, websiteSchema } from "../lib/structuredData";
import ogImage from "../assets/highlights/kuhinja-sank-1600.webp";

// The same static Inter files the site loaded from rsms.me/inter,
// now self-hosted and preloaded by Next.js.
const inter = localFont({
  src: [
    { path: "../fonts/Inter-ExtraLight.woff2", weight: "200", style: "normal" },
    { path: "../fonts/Inter-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Inter-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Inter-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/Inter-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const DEFAULT_TITLE = "Jorgić Woodwork | Namještaj po mjeri, kuhinje, ormari i stolarija";
const DEFAULT_DESCRIPTION =
  "Jorgić Woodwork izrađuje kuhinje, ormare, krevete, vrata, prozore, stepenice i ostalu stolariju po mjeri. Kvalitetna izrada i dugogodišnje iskustvo.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "stolarija",
    "stolarija Banja Luka",
    "namještaj po mjeri",
    "namještaj po mjeri Banja Luka",
    "kuhinje po mjeri",
    "ormari po mjeri",
    "kreveti",
    "vrata",
    "prozori",
    "stepenice",
    "drveni namještaj",
    "Jorgić Woodwork",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "bs_BA",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description:
      "Izrada namještaja i stolarije po mjeri. Kuhinje, ormari, kreveti, vrata, prozori i ostali stolarski radovi.",
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
        alt: "Bijela kuhinja po mjeri sa šankom – Jorgić Woodwork",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: "Izrada namještaja i stolarije po mjeri.",
    images: [ogImage.src],
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bs" className={inter.variable}>
      <body>
        <AppRouterCacheProvider>
          <div id="root">
            <SpeedInsights />
            <Analytics />
            <SmoothScroll />
            <main>
              <Navbar />
              {children}
              <Footer />
            </main>
          </div>
        </AppRouterCacheProvider>
        <JsonLd data={businessSchema} />
        <JsonLd data={websiteSchema} />
      </body>
    </html>
  );
}
