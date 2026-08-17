/**
 * Contenu tarifs : source unique partagée par la section Tarifs de la home
 * (components/sections/Pricing.tsx) et les pages /prix-site-vitrine (FR) et
 * /en/pricing (EN). Tout texte affiché vient d'ici (cf. CONTENT.md).
 *
 * Les montants restent en euros dans les deux langues : c'est la devise
 * réellement facturée, la convertir serait un engagement faux.
 */

import type { Locale } from "./locales";

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

export type QaItem = { question: string; answer: string };

type PricingContent = {
  plans: readonly PricingPlan[];
  /** Section Tarifs de la home (#tarifs). */
  section: {
    label: string;
    h2: string;
    lead: string;
    /** Lien vers la page d'intention dédiée (maillage interne). */
    pageLinkLabel: string;
  };
  /** Page dédiée : /prix-site-vitrine (FR), /en/pricing (EN). */
  page: {
    metaTitle: string;
    metaDescription: string;
    breadcrumbLabel: string;
    breadcrumbHome: string;
    serviceName: string;
    h1: string;
    lead: string;
    detailLabel: string;
    detailTitle: string;
    whyLabel: string;
    whyTitle: string;
    whyBody: string;
    faqLabel: string;
    faqTitle: string;
    faq: readonly QaItem[];
    ctaTitle: string;
    ctaText: string;
    ctaLabel: string;
    ctaSecondaryLabel: string;
  };
};

const FR_FEATURES_LABEL = "Inclus :";
const EN_FEATURES_LABEL = "Included:";

const CONTENT: Record<Locale, PricingContent> = {
  fr: {
    plans: [
      {
        offer: "Site vitrine",
        price: "À partir de 490 €",
        priceTooltip:
          "Le tarif peut évoluer selon : le nombre de pages, le niveau de personnalisation, les contenus à intégrer et les fonctionnalités spécifiques.",
        pitch:
          "Pour les artisans, indépendants et petites entreprises qui veulent un site clair, professionnel et efficace.",
        featuresLabel: FR_FEATURES_LABEL,
        features: [
          "Design moderne adapté à votre activité",
          "Responsive mobile, tablette et desktop",
          "SEO de base",
          "Formulaire de contact",
          "Aide à la mise en ligne avec la configuration de votre nom de domaine et de votre hébergement",
        ],
        addon: {
          title: "Option Sérénité",
          price: "30 €/mois",
          intro: "Vous ne voulez rien gérer ? Je m'occupe de tout pour vous :",
          items: [
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
          ],
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
        featuresLabel: FR_FEATURES_LABEL,
        features: [
          "Tout ce qui est dans l'offre Site vitrine",
          "Direction artistique plus poussée",
          "Animations et interactions utiles",
          "Expérience plus immersive",
          "Intégrations spécifiques",
          "Accompagnement créatif",
        ],
        ctaLabel: "Imaginer mon projet",
      },
      {
        offer: "Produit digital",
        price: "Sur devis",
        pitch: "Pour transformer une idée en produit concret.",
        features: [
          "Conception produit",
          "MVP",
          "SaaS",
          "Application web",
          "Application mobile",
          "Dashboard / back-office",
          "Intégrations IA / automatisations",
        ],
        ctaLabel: "Construire mon produit",
      },
    ],
    section: {
      label: "Tarifs",
      h2: "Une offre adaptée à chaque projet.",
      lead: "Du site vitrine simple au produit digital plus ambitieux, chaque projet est pensé selon ses besoins, son niveau de personnalisation et son budget.",
      pageLinkLabel: "Le prix d'un site vitrine en détail",
    },
    page: {
      metaTitle: "Prix d'un site vitrine : combien ça coûte ? Dès 490 €",
      metaDescription:
        "Le prix d'un site vitrine : à partir de 490 €, option de suivi à 30 €/mois. Tarifs clairs, sans devis à rallonge ni frais cachés. Freelance à Caen.",
      breadcrumbLabel: "Prix d'un site vitrine",
      breadcrumbHome: "Accueil",
      serviceName: "Création de site vitrine",
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
    },
  },
  en: {
    plans: [
      {
        offer: "Business site",
        price: "From €490",
        priceTooltip:
          "The price can vary depending on the number of pages, how bespoke the design is, the content to integrate and any specific features.",
        pitch:
          "For makers, freelancers and small businesses who want a clear, professional and effective site.",
        featuresLabel: EN_FEATURES_LABEL,
        features: [
          "Modern design tailored to your business",
          "Responsive on mobile, tablet and desktop",
          "Core SEO",
          "Contact form",
          "Help going live, including domain name and hosting setup",
        ],
        addon: {
          title: "Peace of mind plan",
          price: "€30/month",
          intro: "Would rather not deal with any of it? I take care of everything:",
          items: [
            "Hosting",
            "Domain name",
            "Technical maintenance",
            "Backups",
            {
              label: "Unlimited minor edits within 48 hours",
              tooltip:
                "Minor edits means text, photos, opening hours, prices, a dish on the menu, and so on. Adding a page, redesigning the site or building a new feature is quoted separately.",
            },
            "Direct support",
          ],
          note: "Cancel any time.",
        },
        note: "You are never locked in: at any point I transfer the domain name to you and hand over the site's code. The site is yours.",
        noteEmphasis: "The site is yours.",
        ctaLabel: "Build my site",
      },
      {
        offer: "Creative site",
        price: "On quote",
        pitch:
          "For brands and projects that want to go further visually, without losing clarity.",
        featuresLabel: EN_FEATURES_LABEL,
        features: [
          "Everything in the Business site offer",
          "Stronger art direction",
          "Animations and interactions that serve a purpose",
          "A more immersive experience",
          "Specific integrations",
          "Creative guidance",
        ],
        ctaLabel: "Shape my project",
      },
      {
        offer: "Digital product",
        price: "On quote",
        pitch: "To turn an idea into a real product.",
        features: [
          "Product design",
          "MVP",
          "SaaS",
          "Web app",
          "Mobile app",
          "Dashboard / back office",
          "AI integrations / automation",
        ],
        ctaLabel: "Build my product",
      },
    ],
    section: {
      label: "Pricing",
      h2: "An offer that fits each project.",
      lead: "From a simple business site to a more ambitious digital product, every project is scoped around its needs, how bespoke it should be and its budget.",
      pageLinkLabel: "What a business site costs, in detail",
    },
    page: {
      metaTitle: "How much does a business website cost? From €490",
      metaDescription:
        "What a business website costs: from €490, with an optional €30/month care plan. Clear pricing, no endless quotes, no hidden fees. Based in Caen, France.",
      breadcrumbLabel: "Website pricing",
      breadcrumbHome: "Home",
      serviceName: "Business website design",
      h1: "How much does a business website cost?",
      lead: "At Yan-dev, a business website starts at €490. The price then depends on the number of pages, how bespoke the design is and the features you need, and you know it before we start. If you would rather not manage anything, the peace of mind plan covers it all for €30/month, cancellable at any time.",
      detailLabel: "Pricing",
      detailTitle: "The pricing in detail",
      whyLabel: "Why this price",
      whyTitle: "A €490 site is not a cut-price site.",
      whyBody:
        "The price comes from the format: a clear, bespoke site, with no middleman and no useless layers on top. You get modern code, and a site that is fast, responsive and set up for local search.",
      faqLabel: "FAQ",
      faqTitle: "Common questions about pricing",
      faq: [
        {
          question: "How much does a business website cost?",
          answer:
            "A business website starts at €490 at Yan-dev. The price varies with the number of pages, how bespoke the design is, the content to integrate and any specific features. You are told the price up front, with no surprises.",
        },
        {
          question: "What is included in the price?",
          answer:
            "A modern design tailored to your business, a responsive site (mobile, tablet, desktop), core SEO, a contact form, and help going live including the setup of your domain name and hosting.",
        },
        {
          question: "What is the €30/month peace of mind plan for?",
          answer:
            "It is there if you would rather not manage anything: hosting, domain name, technical maintenance, backups, unlimited minor edits within 48 hours and direct support. It is optional and cancellable at any time.",
        },
        {
          question: "Is there a commitment?",
          answer:
            "No. Building the site is a one-off payment, and the peace of mind plan can be cancelled at any time. Either way the site belongs to you: I can transfer the domain name and hand over the code whenever you want.",
        },
        {
          question: "Can an affordable site really be professional?",
          answer:
            "Yes. The low price comes from the format, a clear bespoke business site built directly with me rather than through an agency, not from rushed work: modern code, careful performance and local search set up properly.",
        },
        {
          question: "What about a more ambitious project?",
          answer:
            "Two quote-based offers take over: the creative site, to go further visually with stronger art direction and animation; and the digital product, for a web or mobile app, a SaaS or an MVP. We talk it through and I put together a proposal that fits.",
        },
      ],
      ctaTitle: "Got a website project in mind?",
      ctaText:
        "Tell me about your business in two lines and I will come back with a clear estimate.",
      ctaLabel: "Tell me about your project",
      ctaSecondaryLabel: "See examples",
    },
  },
};

export function pricingContent(locale: Locale): PricingContent {
  return CONTENT[locale];
}
