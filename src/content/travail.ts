/**
 * Contenu de la section « Mon travail » : les sites livrés d'un côté,
 * les produits de l'autre. Cf. CONTENT.md §4.
 */

/** Les trois familles de sites, de la plus créative à la plus classique. */
export const SITE_CATEGORIES = {
  creatif: "Site créatif",
  vitrineCreatif: "Site vitrine créatif",
  vitrine: "Site vitrine",
} as const;

export type SiteCategory =
  (typeof SITE_CATEGORIES)[keyof typeof SITE_CATEGORIES];

export type Website = {
  id: string;
  title: string;
  /** Métier ou secteur du client. */
  sector: string;
  category: SiteCategory;
  href: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export const WEBSITES: readonly Website[] = [
  {
    id: "beerbee",
    title: "BeerBee",
    sector: "Brasserie artisanale",
    category: SITE_CATEGORIES.creatif,
    href: "https://brasserie-beerbee.vercel.app/",
    image: {
      src: "/projects/brasserie-beerbee.jpg",
      alt: "Aperçu du site exemple brasserie artisanale BeerBee",
      width: 1618,
      height: 910,
    },
  },
  {
    id: "madman-tattoo",
    title: "Madman Tattoo",
    sector: "Tatoueur",
    category: SITE_CATEGORIES.vitrineCreatif,
    href: "https://madman-tattoo.vercel.app/",
    image: {
      src: "/projects/madman-tattoo.jpg",
      alt: "Aperçu du site exemple tatoueur Madman Tattoo",
      width: 1618,
      height: 910,
    },
  },
  {
    id: "atelier-lume",
    title: "Atelier Lumé",
    sector: "Architecte d'intérieur",
    category: SITE_CATEGORIES.vitrineCreatif,
    href: "https://atelier-lume-kappa.vercel.app/",
    image: {
      src: "/projects/atelier-lume.png",
      alt: "Aperçu du site exemple architecte d'intérieur Atelier Lumé",
      width: 1618,
      height: 910,
    },
  },
  {
    id: "restaurant",
    title: "L'océan",
    sector: "Restaurant",
    category: SITE_CATEGORIES.vitrine,
    href: "https://site-pf-2.vercel.app/",
    image: {
      src: "/projects/restaurant.png",
      alt: "Aperçu du site exemple restaurant L'océan",
      width: 1618,
      height: 910,
    },
  },
  {
    id: "lumio",
    title: "Lumio-coffee",
    sector: "Coffee shop",
    category: SITE_CATEGORIES.vitrine,
    href: "https://lumio-coffee.vercel.app/",
    image: {
      src: "/projects/lumio.png",
      alt: "Aperçu du site exemple coffee shop Lumio-coffee",
      width: 1618,
      height: 910,
    },
  },
  {
    id: "cerf-dore",
    title: "Le Cerf Doré",
    sector: "Bistrot",
    category: SITE_CATEGORIES.vitrine,
    href: "https://cerf-dore.vercel.app/",
    image: {
      src: "/projects/cerf-dore.png",
      alt: "Aperçu du site exemple bistrot Le Cerf Doré",
      width: 1618,
      height: 910,
    },
  },
] as const;

export type Product = {
  id: string;
  title: string;
  /** Nature du produit, affichée en mono sous le titre. */
  kind: string;
  /** Étape de vie du produit. */
  status: "live" | "construction";
  statusLabel: string;
  description: string;
  href?: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export const PRODUCTS: readonly Product[] = [
  {
    id: "cleanai",
    title: "CleanAI",
    kind: "iOS App",
    status: "live",
    statusLabel: "En ligne",
    description:
      "Nettoie les images et vidéos générées par IA avant publication sur TikTok ou Instagram. Traitement natif iOS, directement sur l'appareil.",
    href: "https://cleanaiapp.com",
    image: {
      src: "/products/cleanai.jpg",
      alt: "Aperçu du site de CleanAI, application iOS de nettoyage des contenus générés par IA",
      width: 1618,
      height: 910,
    },
  },
  {
    id: "betawall",
    title: "BetaWall",
    kind: "SaaS B2B",
    status: "construction",
    statusLabel: "En construction",
    description:
      "Un SaaS B2B pensé pour les salles d'escalade. En cours de construction.",
    image: {
      src: "/products/betawall.png",
      alt: "Logo de BetaWall, SaaS B2B pour les salles d'escalade",
      width: 1618,
      height: 910,
    },
  },
] as const;
