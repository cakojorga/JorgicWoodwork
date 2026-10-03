const isDev = process.env.NODE_ENV !== "production";

// Content Security Policy: only what the site actually loads.
// - 'unsafe-inline' scripts: Next.js inlines its bootstrap data; nonces would
//   force every page to be rendered per request (no static pages / CDN).
// - 'unsafe-inline' styles: MUI/Emotion and Framer Motion set inline styles.
// - Firebase Storage: lightbox falls back to the original photo there.
// - Web3Forms: the contact form posts to it.
// - va.vercel-scripts.com: Vercel Analytics loads its debug script from there in dev.
// - hCaptcha (contact form): script, iframe, styles and API on hcaptcha.com.
const HCAPTCHA = "https://hcaptcha.com https://*.hcaptcha.com";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://va.vercel-scripts.com ${HCAPTCHA}`,
  `style-src 'self' 'unsafe-inline' ${HCAPTCHA}`,
  "img-src 'self' data: blob: https://firebasestorage.googleapis.com",
  "font-src 'self' data:",
  `connect-src 'self' https://api.web3forms.com https://va.vercel-scripts.com ${HCAPTCHA}${isDev ? " ws: wss:" : ""}`,
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://api.web3forms.com",
  "frame-ancestors 'none'",
  `frame-src ${HCAPTCHA}`,
  "worker-src 'self' blob:",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Nobody can show the site inside their own page (clickjacking)
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  images: {
    // Lightbox photos are resized from the Firebase originals (lib/galleryImages.jsx)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/jorgicwoodwork.firebasestorage.app/o/**",
        search: "?alt=media",
      },
    ],
    // Only the size the lightbox asks for, so nobody can make the server
    // produce (and bill for) dozens of other sizes of every photo
    deviceSizes: [1920],
    imageSizes: [],
    qualities: [75],
    // WebP only: AVIF encodes several times slower, which the first visitor would feel
    formats: ["image/webp"],
    // Optimised images are keyed by URL, and gallery photos never change in place
    minimumCacheTTL: 2592000,
  },
};

export default nextConfig;
