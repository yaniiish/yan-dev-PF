/**
 * Contenu de la section Hero. Cf. CONTENT.md §3.
 *
 * Le H1 est découpé en deux lignes pour équilibrer la composition : la ligne
 * la plus longue fait 33 caractères au lieu de 35, ce qui laisse monter
 * l'échelle du titre. Toute traduction doit respecter cet équilibre, sinon le
 * titre déborde (les lignes sont en `whitespace-nowrap`).
 */

import type { Locale } from "./locales";

type HeroContent = {
  h1Line1: string;
  h1Line2Pre: string;
  h1Line2Accent: string;
  lead: string;
  intro: string;
  ctaPrimary: string;
  ctaSecondary: string;
  avatarAlt: string;
  card: {
    name: string;
    role: string;
    pitch: string;
    /**
     * Guillemets de la citation : la convention change avec la langue
     * (chevrons + espaces insécables en français, doubles droits en anglais).
     */
    quote: { open: string; close: string };
    tagline: string;
    availability: string;
  };
};

const CONTENT: Record<Locale, HeroContent> = {
  fr: {
    h1Line1: "Creative Developer,",
    h1Line2Pre: "Website Creator &",
    h1Line2Accent: "Product Builder",
    lead: "Sites web créatifs, sites vitrines plus simples et produits digitaux.",
    intro:
      "Du site vitrine simple à l'expérience web plus créative, jusqu'au produit digital complet. Je conçois chaque projet selon ses besoins, ses ambitions et son budget, sans jamais sacrifier la qualité.",
    ctaPrimary: "Voir mes projets",
    ctaSecondary: "Discuter d'un projet",
    avatarAlt: "Portrait de Yan, développeur web indépendant à Caen",
    card: {
      name: "Yan",
      role: "Creative Developer · Product Builder",
      pitch:
        "J'aime transformer une idée en quelque chose de concret, qu'il s'agisse d'un simple site vitrine ou d'un produit digital complet.",
      quote: { open: "\u00AB\u00A0", close: "\u00A0\u00BB" },
      tagline: "Je travaille en direct, sans intermédiaire.",
      availability: "Disponible actuellement",
    },
  },
  en: {
    h1Line1: "Creative Developer,",
    h1Line2Pre: "Website Creator &",
    h1Line2Accent: "Product Builder",
    lead: "Creative websites, simpler business sites and digital products.",
    intro:
      "From a straightforward business site to a more creative web experience, all the way to a complete digital product. I design every project around its needs, its ambition and its budget, without ever cutting corners on quality.",
    ctaPrimary: "See my work",
    ctaSecondary: "Start a project",
    avatarAlt: "Portrait of Yan, independent web developer in Caen, France",
    card: {
      name: "Yan",
      role: "Creative Developer · Product Builder",
      pitch:
        "I like turning an idea into something real, whether it is a simple business site or a full digital product.",
      quote: { open: "\u201C", close: "\u201D" },
      tagline: "You work with me directly, with no middleman.",
      availability: "Available right now",
    },
  },
};

export function heroContent(locale: Locale): HeroContent {
  return CONTENT[locale];
}
