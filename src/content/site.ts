/**
 * Constantes du site — source unique pour le nom, l'email, la navigation, etc.
 * Tous les textes affichés doivent venir d'ici ou de fichiers content/* dédiés,
 * jamais en dur dans un composant (voir CONTENT.md).
 *
 * Ce qui ne dépend pas de la langue (nom, ville, contacts) reste exporté tel
 * quel. Le reste passe par `siteContent(locale)`.
 */

import type { Locale } from "./locales";

export const SITE_NAME = "Yan-dev";

export const CITY = "Caen";

// Placeholder tant que le domaine n'est pas acheté (cf. ROADMAP §1.9).
export const CONTACT_EMAIL = "contact@yan-dev.fr";

export const CONTACT_INSTAGRAM_URL = "https://www.instagram.com/yan.dev__";
export const CONTACT_INSTAGRAM_HANDLE = "@yan.dev__";

export type NavLink = {
  id: string;
  label: string;
  href: string;
};

type SiteContent = {
  tagline: string;
  description: string;
  navLinks: readonly NavLink[];
  footer: {
    baseline: string;
    navTitle: string;
    resourcesTitle: string;
    contactTitle: string;
    navLabel: string;
    rights: string;
  };
};

const CONTENT: Record<Locale, SiteContent> = {
  fr: {
    tagline: "Studio web indépendant, basé à Caen",
    description:
      "Studio web freelance basé à Caen, opérant partout en France. Sites vitrines modernes et rapides pour artisans, commerçants et indépendants : du site simple au site premium sur mesure.",
    navLinks: [
      { id: "hero", label: "Accueil", href: "#hero" },
      { id: "travail", label: "Mon travail", href: "#travail" },
      { id: "processus", label: "Comment ça marche", href: "#processus" },
      { id: "tarifs", label: "Tarifs", href: "#tarifs" },
      { id: "contact", label: "Contact", href: "#contact" },
    ],
    footer: {
      baseline: `Studio web freelance, basé à ${CITY}, à votre service partout en France.`,
      navTitle: "Navigation",
      resourcesTitle: "Ressources",
      contactTitle: "Contact",
      navLabel: "Liens du site",
      rights: "Tous droits réservés.",
    },
  },
  en: {
    tagline: "Independent web studio, based in Caen, France",
    description:
      "Independent web studio based in Caen, France, working with clients anywhere. Fast, modern websites for makers, shop owners and small businesses: from a simple one-pager to a fully bespoke premium site.",
    navLinks: [
      { id: "hero", label: "Home", href: "#hero" },
      { id: "travail", label: "My work", href: "#travail" },
      { id: "processus", label: "How it works", href: "#processus" },
      { id: "tarifs", label: "Pricing", href: "#tarifs" },
      { id: "contact", label: "Contact", href: "#contact" },
    ],
    footer: {
      baseline: `Independent web studio based in ${CITY}, France, working with clients anywhere.`,
      navTitle: "Navigation",
      resourcesTitle: "Resources",
      contactTitle: "Contact",
      navLabel: "Site links",
      rights: "All rights reserved.",
    },
  },
};

export function siteContent(locale: Locale): SiteContent {
  return CONTENT[locale];
}
