/**
 * Contenu tarifs : source unique partagée par la section Tarifs de la home
 * (components/sections/Pricing.tsx) et la page /prix-site-vitrine.
 * Tout texte affiché vient d'ici (cf. CONTENT.md).
 */

/** Route de la page d'intention tarifs (source unique). */
export const PRIX_PATH = "/prix-site-vitrine";

/** Feature de carte : texte simple, ou texte avec infobulle (i). */
export type PricingFeature = string | { label: string; tooltip: string };

export type PricingPlan = {
  badge?: string;
  offer: string;
  price: string;
  priceNote?: string;
  /** Précision mise en avant sous le prix (ex : reprise en main après 1 an). */
  renewalNote?: string;
  recurring?: string;
  recurringNote?: string;
  features?: readonly PricingFeature[];
  ctaLabel: string;
  highlight?: boolean;
};

const ESSENTIEL_FEATURES: readonly PricingFeature[] = [
  "Site moderne et rapide sur mesure",
  "Responsive mobile, tablette, desktop",
  "SEO de base",
  "Formulaire de contact",
  "Mise en ligne rapide",
];

const SERENITE_FEATURES: readonly PricingFeature[] = [
  "Tout ce qui est inclus dans l'offre Essentiel",
  "Nom de domaine & hébergement gérés en continu",
  {
    label: "Modifications mineures illimitées sous 48h",
    tooltip:
      "Les modifications mineures : texte, photo, horaires, prix, un plat au menu, etc. L'ajout de page, la refonte du design ou une nouvelle fonctionnalité font l'objet d'un devis à part.",
  },
];

const PREMIUM_FEATURES: readonly PricingFeature[] = [
  "Design poussé et animations avancées",
  "Réservation, mini-boutique, intégrations spécifiques",
  "Projets de plus grande envergure",
  "On échange, je vous fais une proposition adaptée",
  "Applications",
  "Agents IA",
];

export const PRICING_PLANS: readonly PricingPlan[] = [
  {
    badge: "Sans abonnement",
    offer: "Essentiel",
    price: "690 €",
    priceNote: "en une fois · nom de domaine et hébergement inclus la première année",
    renewalNote:
      "Après 1 an : vous reprenez la main, je vous cède tout ou bien vous passez au Pack Sérénité.",
    features: ESSENTIEL_FEATURES,
    ctaLabel: "Démarrer mon projet",
  },
  {
    badge: "Conseillé",
    highlight: true,
    offer: "Pack Sérénité",
    price: "490 €",
    priceNote: "à la création",
    recurring: "+ 30 €/mois",
    recurringNote: "sans engagement, résiliable à tout moment (préavis 1 mois)",
    features: SERENITE_FEATURES,
    ctaLabel: "Choisir le suivi",
  },
  {
    offer: "Projet premium",
    price: "Sur devis",
    priceNote: "selon ambition et fonctionnalités",
    features: PREMIUM_FEATURES,
    ctaLabel: "Parlons de votre projet",
  },
] as const;

export const PRICING_FOOTNOTE =
  "Vous n'êtes jamais prisonnier : à tout moment, je vous transfère le nom de domaine à votre nom et vous cède le code du site. Le site est à vous.";

/** Section Tarifs de la home (#tarifs). */
export const PRICING_SECTION = {
  h2: "Des tarifs clairs, sans devis à rallonge.",
  lead: "Le prix annoncé est le prix payé, et je gère tout de A à Z : vous n'avez rien à faire. Si votre projet sort du cadre, on en parle et on adapte ensemble.",
  /** Lien vers la page d'intention dédiée (maillage interne). */
  pageLinkLabel: "Le prix d'un site vitrine en détail",
} as const;

/** Page d'intention /prix-site-vitrine (cible : prix / site vitrine pas cher). */
export const PRIX_PAGE = {
  metaTitle: "Prix d'un site vitrine : combien ça coûte ? Dès 490 €",
  metaDescription:
    "Le prix d'un site vitrine professionnel : à partir de 490 € tout compris, livré rapidement. Tarifs clairs, sans devis à rallonge ni frais cachés. Freelance à Caen, partout en France.",
  breadcrumbLabel: "Prix d'un site vitrine",
  h1: "Combien coûte un site vitrine ?",
  lead: "Deux formules sans engagement chez Yan-dev : l'Essentiel à 690 € une fois, le site est à vous (nom de domaine et hébergement inclus la première année), ou le Pack Sérénité à 490 € à la création puis 30 €/mois, tout géré pour vous. Le prix annoncé est le prix payé : pas de devis gonflé, pas de frais cachés.",
  detailLabel: "Tarifs",
  detailTitle: "Le détail des tarifs",
  whyLabel: "Pourquoi ce prix",
  whyTitle: "Un site à 490 €, ce n'est pas un site au rabais.",
  whyBody:
    "Le prix vient du format (un site clair, sur mesure, sans intermédiaire ni surcouche inutile). Vous avez un code moderne, un site rapide, responsive et référencé localement.",
  faqLabel: "FAQ",
  faqTitle: "Questions fréquentes sur le prix",
  faq: [
    {
      question: "Combien coûte un site vitrine ?",
      answer:
        "Deux options chez Yan-dev : l'Essentiel à 690 € une fois, sans abonnement, avec le nom de domaine et l'hébergement inclus la première année ; ou le Pack Sérénité à 490 € à la création puis 30 €/mois, avec le nom de domaine, l'hébergement et les modifications mineures gérés en continu. Le tarif est annoncé d'avance, sans surprise.",
    },
    {
      question: "Qu'est-ce qui est compris dans le prix ?",
      answer:
        "Dans les deux formules : le site sur mesure, responsive (mobile, tablette, ordinateur), le référencement de base, un formulaire de contact et la mise en ligne. Avec le Pack Sérénité, le nom de domaine, l'hébergement et les modifications mineures sont gérés en continu dans l'abonnement mensuel.",
    },
    {
      question: "Y a-t-il un engagement ?",
      answer:
        "Non. L'Essentiel est un paiement unique, sans abonnement. Le Pack Sérénité est résiliable à tout moment, avec un préavis d'un mois. Dans tous les cas, le site vous appartient : je peux vous transférer le nom de domaine et vous céder le code quand vous le souhaitez.",
    },
    {
      question: "Un site pas cher est-il vraiment professionnel ?",
      answer:
        "Oui. Le tarif bas vient du format (un site vitrine clair, sur mesure, en direct sans agence), pas d'un travail bâclé : code moderne, performances et référencement local soignés.",
    },
    {
      question: "Et pour un site plus ambitieux ?",
      answer:
        "C'est possible, sur devis : animations avancées, design poussé, réservation ou boutique simple. On en discute et je vous fais une proposition adaptée.",
    },
  ],
  ctaTitle: "Un projet de site en tête ?",
  ctaText:
    "Dites-moi votre activité en deux lignes, je vous réponds avec une estimation claire.",
  ctaLabel: "Discuter de mon projet",
  ctaSecondaryLabel: "Voir des exemples",
} as const;
