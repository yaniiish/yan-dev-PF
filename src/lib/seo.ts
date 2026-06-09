import type { Metadata } from "next";
import { CITY, CONTACT_EMAIL, SITE_NAME } from "@/content/site";

/**
 * URL publique du site. En prod Vercel, NEXT_PUBLIC_SITE_URL doit être défini
 * (= https://yan-dev.fr). Le fallback pointe sur le domaine de prod (et NON
 * localhost) pour qu'une variable oubliée ne fasse jamais fuiter des URLs
 * localhost dans le sitemap / les canonical / le JSON-LD. En dev local,
 * `.env.local` met NEXT_PUBLIC_SITE_URL=http://localhost:3000.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://yan-dev.fr";

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
        "Mensuel : nom de domaine, hébergement, mises à jour et modifications mineures.",
    },
  ],
} as const;

type BuildMetadataInput = {
  title: string;
  description: string;
  /** Chemin relatif de la page (ex: "/prix-site-vitrine"). Sert au canonical. */
  path: string;
  /** Image OG absolue ou relative. Défaut : OG dynamique global (/opengraph-image). */
  image?: string;
};

/**
 * Construit les metadata d'une page interne (canonical + OpenGraph + Twitter).
 * Le `title` passe par le template "%s | Yan-dev" défini dans layout.tsx.
 * `metadataBase` (layout) résout les chemins relatifs (canonical, OG).
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
}: BuildMetadataInput): Metadata {
  const url = new URL(path, SITE_URL).toString();
  const images = image ? [{ url: image }] : undefined;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      url,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
