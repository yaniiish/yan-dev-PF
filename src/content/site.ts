/**
 * Constantes du site — source unique pour le nom, l'email, la navigation, etc.
 * Tous les textes affichés doivent venir d'ici ou de fichiers content/* dédiés,
 * jamais en dur dans un composant (voir CONTENT.md).
 */

export const SITE_NAME = "Yan-dev";

export const SITE_TAGLINE = "Studio web indépendant, basé à Caen";

export const SITE_DESCRIPTION =
  "Studio web freelance basé à Caen, opérant partout en France. Sites vitrines modernes et rapides pour artisans, commerçants et indépendants : du site simple au site premium sur mesure.";

export const CITY = "Caen";

// Placeholder tant que le domaine n'est pas acheté (cf. ROADMAP §1.9).
export const CONTACT_EMAIL = "contact@yan-dev.fr";

export type NavLink = {
  id: string;
  label: string;
  href: string;
};

export const NAV_LINKS: readonly NavLink[] = [
  { id: "hero", label: "Accueil", href: "#hero" },
  { id: "pourquoi", label: "Pourquoi", href: "#pourquoi" },
  { id: "services", label: "Services", href: "#services" },
  { id: "exemples", label: "Exemples", href: "#exemples" },
  { id: "tarifs", label: "Tarifs", href: "#tarifs" },
  { id: "contact", label: "Contact", href: "#contact" },
] as const;
