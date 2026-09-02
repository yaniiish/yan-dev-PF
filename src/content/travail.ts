/**
 * Contenu de la section « Mon travail » : les sites livrés d'un côté,
 * les produits de l'autre. Cf. CONTENT.md §4.
 *
 * Les données stables (id, lien, visuel, dimensions) ne sont écrites qu'une
 * fois ; seuls les champs réellement traduits sont dédoublés par langue, via
 * le type `Localized`. Ça évite de maintenir deux catalogues en parallèle.
 */

import type { Locale } from "./locales";

type Localized = Record<Locale, string>;

/** Les trois familles de sites, de la plus créative à la plus classique. */
const SITE_CATEGORIES = {
  creatif: { fr: "Site créatif", en: "Creative site" },
  vitrineCreatif: {
    fr: "Site vitrine créatif",
    en: "Creative business site",
  },
  vitrine: { fr: "Site vitrine", en: "Business site" },
} as const satisfies Record<string, Localized>;

type WebsiteSource = {
  id: string;
  title: string;
  /** Métier ou secteur du client. */
  sector: Localized;
  category: Localized;
  href: string;
  image: {
    src: string;
    alt: Localized;
    width: number;
    height: number;
  };
};

export type Website = {
  id: string;
  title: string;
  sector: string;
  category: string;
  href: string;
  image: { src: string; alt: string; width: number; height: number };
};

const WEBSITE_SOURCES: readonly WebsiteSource[] = [
  {
    id: "beerbee",
    title: "BeerBee",
    sector: { fr: "Brasserie artisanale", en: "Craft brewery" },
    category: SITE_CATEGORIES.creatif,
    href: "https://brasserie-beerbee.vercel.app/",
    image: {
      src: "/projects/brasserie-beerbee.jpg",
      alt: {
        fr: "Aperçu du site exemple brasserie artisanale BeerBee",
        en: "Preview of the BeerBee craft brewery sample site",
      },
      width: 1618,
      height: 910,
    },
  },
  {
    id: "madman-tattoo",
    title: "Madman Tattoo",
    sector: { fr: "Tatoueur", en: "Tattoo artist" },
    category: SITE_CATEGORIES.vitrineCreatif,
    href: "https://madman-tattoo.vercel.app/",
    image: {
      src: "/projects/madman-tattoo.jpg",
      alt: {
        fr: "Aperçu du site exemple tatoueur Madman Tattoo",
        en: "Preview of the Madman Tattoo tattoo artist sample site",
      },
      width: 1618,
      height: 910,
    },
  },
  {
    id: "atelier-lume",
    title: "Atelier Lumé",
    sector: { fr: "Architecte d'intérieur", en: "Interior designer" },
    category: SITE_CATEGORIES.vitrineCreatif,
    href: "https://atelier-lume-kappa.vercel.app/",
    image: {
      src: "/projects/atelier-lume.png",
      alt: {
        fr: "Aperçu du site exemple architecte d'intérieur Atelier Lumé",
        en: "Preview of the Atelier Lumé interior designer sample site",
      },
      width: 1618,
      height: 910,
    },
  },
  {
    id: "restaurant",
    title: "L'océan",
    sector: { fr: "Restaurant", en: "Restaurant" },
    category: SITE_CATEGORIES.vitrine,
    href: "https://site-pf-2.vercel.app/",
    image: {
      src: "/projects/restaurant.png",
      alt: {
        fr: "Aperçu du site exemple restaurant L'océan",
        en: "Preview of the L'océan restaurant sample site",
      },
      width: 1618,
      height: 910,
    },
  },
  {
    id: "lumio",
    title: "Lumio-coffee",
    sector: { fr: "Coffee shop", en: "Coffee shop" },
    category: SITE_CATEGORIES.vitrine,
    href: "https://lumio-coffee.vercel.app/",
    image: {
      src: "/projects/lumio.png",
      alt: {
        fr: "Aperçu du site exemple coffee shop Lumio-coffee",
        en: "Preview of the Lumio-coffee coffee shop sample site",
      },
      width: 1618,
      height: 910,
    },
  },
  {
    id: "cerf-dore",
    title: "Le Cerf Doré",
    sector: { fr: "Bistrot", en: "Bistro" },
    category: SITE_CATEGORIES.vitrine,
    href: "https://cerf-dore.vercel.app/",
    image: {
      src: "/projects/cerf-dore.png",
      alt: {
        fr: "Aperçu du site exemple bistrot Le Cerf Doré",
        en: "Preview of the Le Cerf Doré bistro sample site",
      },
      width: 1618,
      height: 910,
    },
  },
] as const;

type ProductSource = {
  id: string;
  title: string;
  /** Nature du produit, affichée en mono sous le titre. */
  kind: string;
  /** Étape de vie du produit. */
  status: "live" | "construction";
  statusLabel: Localized;
  description: Localized;
  /** Absent quand il n'y a rien à visiter, par exemple un produit en chantier. */
  href?: string;
  /** Requis : la vitrine affiche toujours un visuel, capture ou logo. */
  image: {
    src: string;
    alt: Localized;
    width: number;
    height: number;
  };
};

export type Product = {
  id: string;
  title: string;
  kind: string;
  status: "live" | "construction";
  statusLabel: string;
  description: string;
  href?: string;
  image: { src: string; alt: string; width: number; height: number };
};

const PRODUCT_SOURCES: readonly ProductSource[] = [
  {
    id: "cleanai",
    title: "CleanAI",
    kind: "iOS App",
    status: "live",
    statusLabel: { fr: "En ligne", en: "Live" },
    description: {
      fr: "Nettoie les images et vidéos générées par IA avant publication sur TikTok ou Instagram. Traitement natif iOS, directement sur l'appareil.",
      en: "Cleans up AI-generated images and videos before you post them on TikTok or Instagram. Native iOS processing, entirely on device.",
    },
    href: "https://cleanaiapp.com",
    image: {
      src: "/products/cleanai.jpg",
      alt: {
        fr: "Aperçu du site de CleanAI, application iOS de nettoyage des contenus générés par IA",
        en: "Preview of the CleanAI website, an iOS app that cleans up AI-generated content",
      },
      width: 1618,
      height: 910,
    },
  },
  {
    id: "betawall",
    title: "BetaWall",
    kind: "SaaS B2B",
    status: "construction",
    statusLabel: { fr: "En construction", en: "In progress" },
    description: {
      fr: "Un SaaS B2B pensé pour les salles d'escalade. En cours de construction.",
      en: "A B2B SaaS built for climbing gyms. Currently in the works.",
    },
    href: "https://betawall.app/",
    image: {
      src: "/products/betawall.png",
      alt: {
        fr: "Logo de BetaWall, SaaS B2B pour les salles d'escalade",
        en: "BetaWall logo, a B2B SaaS for climbing gyms",
      },
      width: 1618,
      height: 910,
    },
  },
] as const;

export function websites(locale: Locale): readonly Website[] {
  return WEBSITE_SOURCES.map((site) => ({
    id: site.id,
    title: site.title,
    sector: site.sector[locale],
    category: site.category[locale],
    href: site.href,
    image: { ...site.image, alt: site.image.alt[locale] },
  }));
}

export function products(locale: Locale): readonly Product[] {
  return PRODUCT_SOURCES.map((product) => ({
    id: product.id,
    title: product.title,
    kind: product.kind,
    status: product.status,
    statusLabel: product.statusLabel[locale],
    description: product.description[locale],
    href: product.href,
    image: { ...product.image, alt: product.image.alt[locale] },
  }));
}

type TravailContent = {
  label: string;
  h2: string;
  lead: string;
  columnWebsites: string;
  columnProducts: string;
  metiersLinkLabel: string;
  /** Nom de l'élément dans les aria-labels de la vitrine. */
  websiteNoun: string;
  productNoun: string;
};

const CONTENT: Record<Locale, TravailContent> = {
  fr: {
    label: "Mon travail",
    h2: "Ce que je construis.",
    lead: "Sites web créatifs, sites vitrines et produits digitaux pensés pour répondre à des objectifs concrets.",
    columnWebsites: "Sites web",
    columnProducts: "Produits",
    metiersLinkLabel: "Des exemples par métier",
    websiteNoun: "le site",
    productNoun: "le produit",
  },
  en: {
    label: "My work",
    h2: "What I build.",
    lead: "Creative websites, business sites and digital products, all designed around concrete goals.",
    columnWebsites: "Websites",
    columnProducts: "Products",
    metiersLinkLabel: "Examples by trade",
    websiteNoun: "the site",
    productNoun: "the product",
  },
};

export function travailContent(locale: Locale): TravailContent {
  return CONTENT[locale];
}
