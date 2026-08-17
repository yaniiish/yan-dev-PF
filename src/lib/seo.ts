import type { Metadata } from "next";
import { OG_LOCALE, type Locale } from "@/content/locales";
import {
  CITY,
  CONTACT_EMAIL,
  CONTACT_INSTAGRAM_URL,
  SITE_NAME,
} from "@/content/site";
import { languageAlternates, type RouteKey } from "@/lib/routes";

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
 * Images OpenGraph figées dans `public/`, une par langue (1200x630).
 *
 * Elles remplacent les anciennes routes `opengraph-image.tsx` : celles-ci
 * servaient l'image sous un chemin haché, donc instable, ce qui laissait
 * `ProfessionalService.image` pointer vers un 404 et privait de vignette les
 * 10 pages qui n'utilisent pas la convention de fichier.
 *
 * Pour les regénérer après un changement de copy : voir l'entête de
 * `src/lib/og.tsx`.
 */
export const OG_IMAGE: Record<Locale, string> = {
  fr: "/og-image.png",
  en: "/og-image-en.png",
};

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

/** Doit décrire ce que l'image affiche réellement. */
export const OG_IMAGE_ALT: Record<Locale, string> = {
  fr: "Yan-dev : sites web créatifs et produits digitaux, freelance à Caen",
  en: "Yan-dev: creative websites and digital products, freelance in Caen, France",
};

type ProfessionalServiceCopy = {
  description: string;
  offers: {
    vitrine: { name: string; description: string };
    serenite: { name: string; description: string };
    creatif: { name: string; description: string };
    produit: { name: string; description: string };
  };
};

const PROFESSIONAL_SERVICE_COPY: Record<Locale, ProfessionalServiceCopy> = {
  fr: {
    // Doit rester cohérente avec les 4 `makesOffer` ci-dessous : c'est la
    // phrase que les moteurs de réponse lisent pour définir l'entité.
    description:
      "Développeur web indépendant basé à Caen. Sites vitrines, sites créatifs sur mesure et produits digitaux, pour des clients partout en France.",
    offers: {
      vitrine: {
        name: "Site vitrine",
        description:
          "Site vitrine sur mesure : design moderne adapté à votre activité, responsive, SEO de base, formulaire de contact et aide à la mise en ligne. À partir de 490 €, selon le nombre de pages, le niveau de personnalisation et les fonctionnalités.",
      },
      serenite: {
        name: "Option Sérénité",
        description:
          "Suivi mensuel facultatif du site vitrine : hébergement, nom de domaine, maintenance technique, sauvegardes, modifications mineures illimitées sous 48h et support direct. Résiliable à tout moment.",
      },
      creatif: {
        name: "Site créatif",
        description:
          "Site sur mesure avec direction artistique poussée, animations et interactions, expérience plus immersive et intégrations spécifiques : proposition adaptée sur devis.",
      },
      produit: {
        name: "Produit digital",
        description:
          "Conception produit, MVP, SaaS, application web ou mobile, dashboard et back-office, intégrations IA et automatisations : proposition adaptée sur devis.",
      },
    },
  },
  en: {
    description:
      "Independent web developer based in Caen, France. Business websites, bespoke creative sites and digital products, for clients anywhere.",
    offers: {
      vitrine: {
        name: "Business site",
        description:
          "Bespoke business website: modern design tailored to your activity, responsive, core SEO, contact form and help going live. From €490, depending on the number of pages, how bespoke the design is and the features needed.",
      },
      serenite: {
        name: "Peace of mind plan",
        description:
          "Optional monthly care plan for the website: hosting, domain name, technical maintenance, backups, unlimited minor edits within 48 hours and direct support. Cancel any time.",
      },
      creatif: {
        name: "Creative site",
        description:
          "Bespoke site with stronger art direction, animation and interaction, a more immersive experience and specific integrations: proposal tailored on quote.",
      },
      produit: {
        name: "Digital product",
        description:
          "Product design, MVP, SaaS, web or mobile app, dashboard and back office, AI integrations and automation: proposal tailored on quote.",
      },
    },
  },
};

/**
 * JSON-LD ProfessionalService — voir SEO.md §4.
 * Combine ancrage local (Caen + villes agglo + Calvados + Normandie) et
 * portée nationale (France) pour ranker à la fois en local et en national.
 *
 * `availableLanguage` déclare les deux langues dans les deux versions : c'est
 * une propriété de l'entreprise, pas de la page.
 */
export function professionalServiceLd(locale: Locale) {
  const copy = PROFESSIONAL_SERVICE_COPY[locale];

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    description: copy.description,
    url: SITE_URL,
    image: `${SITE_URL}${OG_IMAGE[locale]}`,
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
      availableLanguage: ["fr", "en"],
      areaServed: "FR",
    },
    founder: { "@type": "Person", name: "Yan" },
    // SIRET : identifiant d'entreprise vérifiable au répertoire SIRENE. C'est
    // ce qui rend l'entité identifiable pour les moteurs et les moteurs de
    // réponse (cf. SEO.md §3). Doit rester cohérent avec /mentions-legales.
    identifier: {
      "@type": "PropertyValue",
      propertyID: "SIRET",
      value: "10398679000014",
    },
    sameAs: [CONTACT_INSTAGRAM_URL],
    makesOffer: [
      {
        "@type": "Offer",
        name: copy.offers.vitrine.name,
        priceCurrency: "EUR",
        description: copy.offers.vitrine.description,
        // `minPrice` et non `price` : le tarif est un point de départ, pas un
        // montant ferme. Annoncer 490 € comme prix fixe serait faux.
        priceSpecification: {
          "@type": "PriceSpecification",
          minPrice: "490",
          priceCurrency: "EUR",
        },
      },
      {
        "@type": "Offer",
        name: copy.offers.serenite.name,
        price: "30",
        priceCurrency: "EUR",
        description: copy.offers.serenite.description,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: "30",
          priceCurrency: "EUR",
          unitText: locale === "fr" ? "mensuel" : "monthly",
          billingDuration: {
            "@type": "QuantitativeValue",
            value: 1,
            unitCode: "MON",
          },
        },
      },
      {
        "@type": "Offer",
        name: copy.offers.creatif.name,
        description: copy.offers.creatif.description,
      },
      {
        "@type": "Offer",
        name: copy.offers.produit.name,
        description: copy.offers.produit.description,
      },
    ],
  } as const;
}

type BuildMetadataInput = {
  title: string;
  description: string;
  /** Chemin relatif de la page (ex: "/prix-site-vitrine"). Sert au canonical. */
  path: string;
  locale: Locale;
  /**
   * Clé de route quand la page existe dans les deux langues. Déclenche les
   * hreflang. Absente sur les pages FR-only (fiches métier, index métiers) :
   * déclarer un alternate anglais qui n'existe pas serait une erreur.
   */
  routeKey?: RouteKey;
  /** Image OG absolue ou relative. Défaut : l'image figée de la locale. */
  image?: string;
  /**
   * Neutralise le suffixe « | Yan-dev » du template de layout.
   *
   * À utiliser sur les pages dont le titre porte déjà une requête longue
   * (fiches métier, index métiers, page prix) : le suffixe leur coûtait 10
   * caractères et poussait le titre au-delà de la limite d'affichage, tronquant
   * l'argument de clic (« dès 490 € ») plutôt que la marque.
   */
  titleAbsolute?: boolean;
};

/**
 * Construit les metadata d'une page interne (canonical + hreflang + OpenGraph
 * + Twitter). Le `title` passe par le template "%s | Yan-dev" défini dans le
 * layout du route group. `metadataBase` (layout) résout les chemins relatifs.
 */
export function buildMetadata({
  title,
  description,
  path,
  locale,
  routeKey,
  image,
  titleAbsolute,
}: BuildMetadataInput): Metadata {
  const url = new URL(path, SITE_URL).toString();
  // Repli sur l'image figée de la locale : sans lui, toute page construite par
  // ce helper partait sans vignette sociale (l'objet `openGraph` explicite
  // ci-dessous prend le pas sur toute convention de fichier).
  const ogImage = image ?? OG_IMAGE[locale];
  const images = [{ url: ogImage, ...OG_IMAGE_SIZE }];

  return {
    title: titleAbsolute ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
      ...(routeKey ? { languages: languageAlternates(routeKey) } : {}),
    },
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      url,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
  };
}
