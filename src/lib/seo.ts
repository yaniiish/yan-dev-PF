import { CITY, CONTACT_EMAIL, SITE_NAME } from "@/content/site";

/**
 * URL publique du site. Fallback localhost tant que le domaine n'est pas
 * acheté (cf. ROADMAP.md §1.9). En prod Vercel, NEXT_PUBLIC_SITE_URL est
 * défini dans les env vars.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/**
 * JSON-LD ProfessionalService — voir SEO.md §4.
 * Combine ancrage local (Caen + villes agglo + Calvados + Normandie) et
 * portée nationale (France) pour ranker à la fois en local et en national.
 */
export const PROFESSIONAL_SERVICE_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  description:
    "Studio web freelance basé à Caen. Sites vitrines modernes pour artisans, commerçants et indépendants partout en France.",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  priceRange: "€€",
  areaServed: [
    { "@type": "City", name: "Caen" },
    { "@type": "City", name: "Hérouville-Saint-Clair" },
    { "@type": "City", name: "Ifs" },
    { "@type": "City", name: "Mondeville" },
    { "@type": "City", name: "Ouistreham" },
    { "@type": "City", name: "Bayeux" },
    { "@type": "City", name: "Lisieux" },
    { "@type": "AdministrativeArea", name: "Calvados" },
    { "@type": "AdministrativeArea", name: "Normandie" },
    { "@type": "Country", name: "France" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: CITY,
    addressRegion: "Calvados",
    postalCode: "14000",
    addressCountry: "FR",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: CONTACT_EMAIL,
    availableLanguage: ["fr"],
    areaServed: "FR",
  },
  founder: { "@type": "Person", name: "Yan" },
  makesOffer: [
    {
      "@type": "Offer",
      name: "Site vitrine",
      price: "490",
      priceCurrency: "EUR",
      description:
        "Site one-page sur mesure, responsive, SEO local inclus.",
    },
    {
      "@type": "Offer",
      name: "Hébergement et maintenance",
      price: "30",
      priceCurrency: "EUR",
      description:
        "Mensuel — nom de domaine, hébergement, mises à jour et modifications mineures.",
    },
  ],
} as const;
