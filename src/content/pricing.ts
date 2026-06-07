/**
 * Contenu tarifs — source unique partagée par la section Tarifs de la home
 * (components/sections/Pricing.tsx) et la page /prix-site-vitrine.
 * Tout texte affiché vient d'ici (cf. CONTENT.md).
 */

export type PricingPlan = {
  badge: string;
  offer: string;
  price: string;
  priceNote?: string;
  recurring?: string;
  recurringNote?: string;
  features?: readonly string[];
  description?: string;
  ctaLabel: string;
  highlight?: boolean;
};

export const VITRINE_FEATURES = [
  "Site moderne et rapide sur mesure",
  "Responsive mobile, tablette, desktop",
  "SEO de base",
  "Formulaire de contact",
  "Mise en ligne rapide",
] as const;

export const PREMIUM_DESCRIPTION =
  "Animations avancées, design poussé, projets de plus grande envergure, intégrations spécifiques (réservation, boutique simple…). On échange, je vous fais une proposition adaptée.";

export const PRICING_PLANS: readonly PricingPlan[] = [
  {
    badge: "Le plus demandé",
    highlight: true,
    offer: "Site vitrine",
    price: "490 €",
    recurring: "+ 30 €/mois",
    recurringNote:
      "nom de domaine, hébergement, mises à jour et modifications mineures",
    features: VITRINE_FEATURES,
    ctaLabel: "Démarrer mon projet",
  },
  {
    badge: "Sur mesure",
    offer: "Site premium",
    price: "Sur devis",
    priceNote: "selon ambition et fonctionnalités",
    description: PREMIUM_DESCRIPTION,
    ctaLabel: "Parlons de votre projet",
  },
] as const;

export const PRICING_FOOTNOTE =
  "Pas de frais cachés. Pas d'engagement long terme sur la maintenance, résiliable à tout moment avec un préavis d'un mois.";

/** Section Tarifs de la home (#tarifs). */
export const PRICING_SECTION = {
  h2: "Des tarifs clairs, sans devis à rallonge.",
  lead: "Le prix annoncé est le prix payé. Si votre projet sort du cadre, on en parle et on adapte ensemble.",
} as const;

/** Page d'intention /prix-site-vitrine (cible : prix / site vitrine pas cher). */
export const PRIX_PAGE = {
  metaTitle: "Prix d'un site vitrine : combien ça coûte ? Dès 490 €",
  metaDescription:
    "Le prix d'un site vitrine professionnel : à partir de 490 € tout compris, livré rapidement. Tarifs clairs, sans devis à rallonge ni frais cachés. Freelance à Caen, partout en France.",
  breadcrumbLabel: "Prix d'un site vitrine",
  h1: "Combien coûte un site vitrine ?",
  lead: "Un site vitrine professionnel coûte 490 € à la création chez Yan-dev, puis 30 €/mois pour le nom de domaine, l'hébergement et les mises à jour. Le prix annoncé est le prix payé : pas de devis gonflé, pas de frais cachés, pas d'engagement.",
  detailLabel: "Tarifs",
  detailTitle: "Le détail des tarifs",
  whyLabel: "Pourquoi ce prix",
  whyTitle: "Un site à 490 €, ce n'est pas un site au rabais.",
  whyBody:
    "Le prix vient du format — un site clair, sur mesure, sans intermédiaire ni surcouche inutile —, pas de la qualité. Vous avez un code moderne, un site rapide, responsive et référencé localement.",
  faqLabel: "FAQ",
  faqTitle: "Questions fréquentes sur le prix",
  faq: [
    {
      question: "Combien coûte un site vitrine ?",
      answer:
        "Chez Yan-dev, un site vitrine sur mesure coûte 490 € à la création, puis 30 €/mois pour le nom de domaine, l'hébergement et les mises à jour mineures. Le tarif est annoncé d'avance, sans surprise.",
    },
    {
      question: "Qu'est-ce qui est compris dans le prix ?",
      answer:
        "Le site sur mesure, responsive (mobile, tablette, ordinateur), le référencement de base, un formulaire de contact et la mise en ligne. Le nom de domaine et l'hébergement sont inclus dans l'abonnement mensuel.",
    },
    {
      question: "Y a-t-il un engagement ?",
      answer:
        "Non. L'abonnement mensuel est résiliable à tout moment, avec un préavis d'un mois.",
    },
    {
      question: "Un site pas cher est-il vraiment professionnel ?",
      answer:
        "Oui. Le tarif bas vient du format — un site vitrine clair, sur mesure, en direct sans agence —, pas d'un travail bâclé : code moderne, performances et référencement local soignés.",
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
