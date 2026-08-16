/**
 * Contenu tarifs : source unique partagée par la section Tarifs de la home
 * (components/sections/Pricing.tsx) et la page /prix-site-vitrine.
 * Tout texte affiché vient d'ici (cf. CONTENT.md).
 */

/** Route de la page d'intention tarifs (source unique). */
export const PRIX_PATH = "/prix-site-vitrine";

/** Ligne de liste : texte simple, ou texte avec infobulle (i). */
export type PricingFeature = string | { label: string; tooltip: string };

/** Encart mis en avant dans une carte (option d'abonnement). */
export type PricingAddon = {
  title: string;
  price: string;
  intro: string;
  items: readonly PricingFeature[];
  note: string;
};

export type PricingPlan = {
  offer: string;
  price: string;
  /** Infobulle (i) accolée au prix, quand celui-ci dépend du périmètre. */
  priceTooltip?: string;
  /** À qui s'adresse l'offre, en une phrase. */
  pitch: string;
  /**
   * Intitulé au-dessus de la liste. Optionnel : sur Produit digital la liste
   * énumère les types de projets possibles, pas ce qui est compris dans une
   * prestation, donc « Inclus : » y serait faux.
   */
  featuresLabel?: string;
  features: readonly PricingFeature[];
  addon?: PricingAddon;
  /** Réassurance en bas de carte. `noteEmphasis` en est la partie en gras. */
  note?: string;
  noteEmphasis?: string;
  ctaLabel: string;
};

/** Intitulé des listes de prestations. */
export const FEATURES_LABEL = "Inclus :";

const VITRINE_FEATURES: readonly PricingFeature[] = [
  "Design moderne adapté à votre activité",
  "Responsive mobile, tablette et desktop",
  "SEO de base",
  "Formulaire de contact",
  "Aide à la mise en ligne avec la configuration de votre nom de domaine et de votre hébergement",
];

const SERENITE_ITEMS: readonly PricingFeature[] = [
  "Hébergement",
  "Nom de domaine",
  "Maintenance technique",
  "Sauvegardes",
  {
    label: "Modifications mineures illimitées sous 48h",
    tooltip:
      "Les modifications mineures : texte, photo, horaires, prix, un plat au menu, etc. L'ajout de page, la refonte du design ou une nouvelle fonctionnalité font l'objet d'un devis à part.",
  },
  "Support direct",
];

const CREATIF_FEATURES: readonly PricingFeature[] = [
  "Tout ce qui est dans l'offre Site vitrine",
  "Direction artistique plus poussée",
  "Animations et interactions utiles",
  "Expérience plus immersive",
  "Intégrations spécifiques",
  "Accompagnement créatif",
];

const PRODUIT_FEATURES: readonly PricingFeature[] = [
  "Conception produit",
  "MVP",
  "SaaS",
  "Application web",
  "Application mobile",
  "Dashboard / back-office",
  "Intégrations IA / automatisations",
];

export const PRICING_PLANS: readonly PricingPlan[] = [
  {
    offer: "Site vitrine",
    price: "À partir de 490 €",
    priceTooltip:
      "Le tarif peut évoluer selon : le nombre de pages, le niveau de personnalisation, les contenus à intégrer et les fonctionnalités spécifiques.",
    pitch:
      "Pour les artisans, indépendants et petites entreprises qui veulent un site clair, professionnel et efficace.",
    featuresLabel: FEATURES_LABEL,
    features: VITRINE_FEATURES,
    addon: {
      title: "Option Sérénité",
      price: "30 €/mois",
      intro: "Vous ne voulez rien gérer ? Je m'occupe de tout pour vous :",
      items: SERENITE_ITEMS,
      note: "Résiliable à tout moment.",
    },
    note: "Vous n'êtes jamais prisonnier : à tout moment, je vous transfère le nom de domaine et vous cède le code du site. Le site est à vous.",
    noteEmphasis: "Le site est à vous.",
    ctaLabel: "Créer mon site",
  },
  {
    offer: "Site créatif",
    price: "Sur devis",
    pitch:
      "Pour les marques et projets qui veulent aller plus loin visuellement, sans sacrifier la lisibilité.",
    featuresLabel: FEATURES_LABEL,
    features: CREATIF_FEATURES,
    ctaLabel: "Imaginer mon projet",
  },
  {
    offer: "Produit digital",
    price: "Sur devis",
    pitch: "Pour transformer une idée en produit concret.",
    features: PRODUIT_FEATURES,
    ctaLabel: "Construire mon produit",
  },
] as const;

/** Section Tarifs de la home (#tarifs). */
export const PRICING_SECTION = {
  h2: "Une offre adaptée à chaque projet.",
  lead: "Du site vitrine simple au produit digital plus ambitieux, chaque projet est pensé selon ses besoins, son niveau de personnalisation et son budget.",
  /** Lien vers la page d'intention dédiée (maillage interne). */
  pageLinkLabel: "Le prix d'un site vitrine en détail",
} as const;

/** Page d'intention /prix-site-vitrine (cible : prix / site vitrine pas cher). */
export const PRIX_PAGE = {
  metaTitle: "Prix d'un site vitrine : combien ça coûte ? Dès 490 €",
  metaDescription:
    "Le prix d'un site vitrine professionnel : à partir de 490 €, avec une option de suivi à 30 €/mois. Tarifs clairs, sans devis à rallonge ni frais cachés. Freelance à Caen, partout en France.",
  breadcrumbLabel: "Prix d'un site vitrine",
  h1: "Combien coûte un site vitrine ?",
  lead: "Chez Yan-dev, un site vitrine démarre à 490 €. Le tarif évolue ensuite selon le nombre de pages, le niveau de personnalisation et les fonctionnalités, et il vous est annoncé avant de commencer. Si vous ne voulez rien gérer, l'option Sérénité prend tout en charge pour 30 €/mois, résiliable à tout moment.",
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
        "Un site vitrine démarre à 490 € chez Yan-dev. Le tarif évolue selon le nombre de pages, le niveau de personnalisation, les contenus à intégrer et les fonctionnalités spécifiques. Il vous est annoncé d'avance, sans surprise.",
    },
    {
      question: "Qu'est-ce qui est compris dans le prix ?",
      answer:
        "Un design moderne adapté à votre activité, un site responsive (mobile, tablette, ordinateur), le référencement de base, un formulaire de contact, et l'aide à la mise en ligne avec la configuration de votre nom de domaine et de votre hébergement.",
    },
    {
      question: "À quoi sert l'option Sérénité à 30 €/mois ?",
      answer:
        "Elle est là si vous ne voulez rien gérer : hébergement, nom de domaine, maintenance technique, sauvegardes, modifications mineures illimitées sous 48h et support direct. Elle est facultative et résiliable à tout moment.",
    },
    {
      question: "Y a-t-il un engagement ?",
      answer:
        "Non. La création du site est un paiement unique, et l'option Sérénité est résiliable à tout moment. Dans tous les cas le site vous appartient : je peux vous transférer le nom de domaine et vous céder le code quand vous le souhaitez.",
    },
    {
      question: "Un site pas cher est-il vraiment professionnel ?",
      answer:
        "Oui. Le tarif bas vient du format (un site vitrine clair, sur mesure, en direct sans agence), pas d'un travail bâclé : code moderne, performances et référencement local soignés.",
    },
    {
      question: "Et pour un projet plus ambitieux ?",
      answer:
        "Deux offres sur devis prennent le relais : le site créatif, pour aller plus loin visuellement avec une direction artistique poussée et des animations ; et le produit digital, pour une application web ou mobile, un SaaS ou un MVP. On en discute et je vous fais une proposition adaptée.",
    },
  ],
  ctaTitle: "Un projet de site en tête ?",
  ctaText:
    "Dites-moi votre activité en deux lignes, je vous réponds avec une estimation claire.",
  ctaLabel: "Discuter de mon projet",
  ctaSecondaryLabel: "Voir des exemples",
} as const;
