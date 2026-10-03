import { SITE_URL, SITE_NAME, business } from "../utility/site";
import { categories, galleryPath } from "../utility/categories";

const abs = (path) => `${SITE_URL}${path}`;

// The business itself, shown on every page
export const businessSchema = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  "@id": abs("/#business"),
  name: business.name,
  alternateName: business.alternateName,
  url: SITE_URL,
  logo: business.logo,
  image: business.logo,
  description: business.description,
  telephone: business.phones[0],
  email: business.email,
  address: { "@type": "PostalAddress", ...business.address },
  areaServed: { "@type": "City", name: "Banja Luka" },
  hasMap: business.map,
  sameAs: [business.instagram],
  contactPoint: business.phones.map((telephone) => ({
    "@type": "ContactPoint",
    telephone,
    contactType: "customer service",
    availableLanguage: ["bs", "sr", "hr"],
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Namještaj i stolarija po mjeri",
    itemListElement: categories.map((category) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: category.seoTitle,
        description: category.description,
        url: abs(galleryPath(category)),
      },
    })),
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": abs("/#website"),
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "bs",
  publisher: { "@id": abs("/#business") },
};

export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
});

export const breadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: abs(item.path),
  })),
});

export const gallerySchema = (category, images, path) => ({
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: `${category.title} – ${SITE_NAME}`,
  description: category.description,
  url: abs(path),
  about: { "@id": abs("/#business") },
  image: images.map((image, index) => ({
    "@type": "ImageObject",
    contentUrl: image.source,
    thumbnailUrl: image.thumb,
    name: `${category.title} – slika ${index + 1}`,
  })),
});
