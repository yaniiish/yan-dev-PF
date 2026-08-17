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
    /**
     * Libellé du lien vers /mentions-legales. La page n'existe qu'en français
     * (mention légale française), mais le lien est affiché dans les deux
     * langues : l'identité de l'éditeur doit rester joignable depuis n'importe
     * quelle page, y compris anglaise.
     */
    legalLabel: string;
  };
};

const CONTENT: Record<Locale, SiteContent> = {
  fr: {
    tagline: "Développeur web indépendant, basé à Caen",
    description:
      "Développeur web indépendant basé à Caen, opérant partout en France. Sites vitrines, sites créatifs sur mesure et produits digitaux.",
    navLinks: [
      { id: "hero", label: "Accueil", href: "#hero" },
      { id: "travail", label: "Mon travail", href: "#travail" },
      { id: "processus", label: "Comment ça marche", href: "#processus" },
      { id: "tarifs", label: "Tarifs", href: "#tarifs" },
      { id: "contact", label: "Contact", href: "#contact" },
    ],
    footer: {
      baseline: `Creative developer & product builder, basé à ${CITY} : projets partout en France et à l'international.`,
      navTitle: "Navigation",
      resourcesTitle: "Ressources",
      contactTitle: "Contact",
      navLabel: "Liens du site",
      rights: "Tous droits réservés.",
      legalLabel: "Mentions légales",
    },
  },
  en: {
    tagline: "Independent web developer, based in Caen, France",
    description:
      "Independent web developer based in Caen, France, working with clients anywhere. Business websites, bespoke creative sites and digital products.",
    navLinks: [
      { id: "hero", label: "Home", href: "#hero" },
      { id: "travail", label: "My work", href: "#travail" },
      { id: "processus", label: "How it works", href: "#processus" },
      { id: "tarifs", label: "Pricing", href: "#tarifs" },
      { id: "contact", label: "Contact", href: "#contact" },
    ],
    footer: {
      baseline: `Creative developer & product builder, based in ${CITY}, France: projects across France and worldwide.`,
      navTitle: "Navigation",
      resourcesTitle: "Resources",
      contactTitle: "Contact",
      navLabel: "Site links",
      rights: "All rights reserved.",
      legalLabel: "Legal notice (French)",
    },
  },
};

export function siteContent(locale: Locale): SiteContent {
  return CONTENT[locale];
}
