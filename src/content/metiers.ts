/**
 * Contenu des pages métier /site-internet/[metier] (V2 SEO, longue traîne).
 * Source unique. Pages data-driven : ajouter un métier = ajouter une entrée.
 * Aucun texte affiché en dur dans le composant (cf. CONTENT.md).
 */

export const METIERS_BASE = "/site-internet";

export function metierPath(slug: string): string {
  return `${METIERS_BASE}/${slug}`;
}

export type MetierFaq = { question: string; answer: string };

export type MetierEnjeu = { title: string; body: string };

export type MetierExample = {
  description: string;
  /** URL du site exemple en ligne. */
  href: string;
  image: { src: string; alt: string; width: number; height: number };
};

export type Metier = {
  slug: string;
  /** Libellé court (footer, liens connexes). */
  navLabel: string;
  /** Nom du service pour le JSON-LD. */
  serviceName: string;
  metaTitle: string;
  metaDescription: string;
  /** Sert au fil d'ariane. */
  breadcrumbLabel: string;
  h1: string;
  lead: string;
  enjeuxTitle: string;
  enjeux: readonly MetierEnjeu[];
  /** Exemples en ligne. Le 1er sert de devanture (vignette de la grille index). */
  examples: readonly MetierExample[];
  faq: readonly MetierFaq[];
  ctaTitle: string;
  ctaText: string;
};

/** Libellés de structure partagés par toutes les pages métier. */
export const METIER_LABELS = {
  enjeux: "Pourquoi",
  example: "Exemple",
  exampleTitle: "Un exemple concret",
  exampleTitlePlural: "Des exemples en ligne",
  exampleCta: "Voir l'exemple en ligne",
  pricing: "Tarif",
  pricingCallout: "Tout compris, à partir de 490 € à la création.",
  pricingCta: "Voir le détail des tarifs",
  faq: "FAQ",
  faqTitle: "Questions fréquentes",
  related: "À voir aussi",
  relatedPricingLabel: "Prix d'un site vitrine",
  relatedPricingDesc: "Tarifs détaillés et FAQ",
  ctaPrimary: "Discuter de mon projet",
  ctaSecondary: "Voir les tarifs",
} as const;

/** Contenu de la page index /site-internet (landing « tous métiers »). */
export const METIERS_PAGE = {
  path: METIERS_BASE,
  /** Libellé du lien footer + niveau de fil d'ariane intermédiaire. */
  navLabel: "Tous les métiers",
  breadcrumbLabel: "Sites internet par métier",
  metaTitle: "Création de site internet pour commerçants et artisans, dès 490 €",
  metaDescription:
    "Un site vitrine moderne pour votre commerce, quel que soit votre métier : visibilité sur Google, infos à jour, dès 490 €. Exemples par métier. Freelance à Caen, partout en France.",
  h1: "Un site internet pour votre métier",
  lead: "Coffee shop, restaurant, boulangerie ou toute autre activité : je conçois des sites vitrines clairs et modernes, adaptés à votre métier, qui vous rendent visible sur Google. Dès 490 €.",
  gridLabel: "Exemples",
  gridTitle: "Des exemples par métier",
  allTitle: "Votre métier n'est pas dans la liste ?",
  allText: "Ce ne sont que des exemples. Je conçois un site pour n'importe quelle activité : artisan, indépendant, profession libérale, association... Le principe reste le même, adapté à vos besoins.",
  allCtaLabel: "Parler de mon projet",
  allCtaSecondaryLabel: "Voir les tarifs",
} as const;

export const METIERS: readonly Metier[] = [
  {
    slug: "coffee-shop",
    navLabel: "Coffee shop",
    serviceName: "Création de site internet pour coffee shop",
    metaTitle: "Création de site internet pour coffee shop, dès 490 €",
    metaDescription:
      "Un site web moderne pour votre coffee shop ou votre café : carte, horaires, ambiance et visibilité sur Google. Dès 490 €, livré rapidement. Freelance à Caen, partout en France.",
    breadcrumbLabel: "Site internet pour coffee shop",
    h1: "Un site internet pour votre coffee shop",
    lead: "Votre coffee shop mérite mieux qu'une simple page Instagram. Un site clair qui met en avant votre carte, votre ambiance et vos horaires, et qui vous rend visible sur Google quand on cherche un café dans le coin. Dès 490 €.",
    enjeuxTitle: "Pourquoi un site pour votre coffee shop",
    enjeux: [
      {
        title: "Sortir sur Google",
        body: "Quand on cherche un café ou un coffee shop dans votre ville, un site bien référencé vous fait apparaître, avec votre adresse et vos horaires.",
      },
      {
        title: "Donner envie avant la visite",
        body: "Photos de vos boissons, de la salle, de l'ambiance : on donne envie de pousser la porte.",
      },
      {
        title: "Des infos toujours à jour",
        body: "Horaires, adresse, carte, événements : tout au même endroit, modifiable en un message.",
      },
      {
        title: "Ne plus dépendre d'Instagram seul",
        body: "Les réseaux complètent un site, mais vous ne maîtrisez ni l'algorithme ni le référencement. Un site, c'est chez vous.",
      },
    ],
    examples: [
      {
        description: "Lumio, un site exemple complet pour coffee shop, en ligne.",
        href: "https://lumio-coffee.vercel.app/",
        image: {
          src: "/projects/lumio.png",
          alt: "Aperçu du site exemple pour coffee shop Lumio",
          width: 1618,
          height: 910,
        },
      },
      {
        description: "GreenCP, un autre exemple de site pour coffee shop, en ligne.",
        href: "https://greencp-test.vercel.app/",
        image: {
          src: "/projects/coffee.png",
          alt: "Aperçu du site exemple pour coffee shop GreenCP",
          width: 1618,
          height: 910,
        },
      },
    ],
    faq: [
      {
        question: "Combien coûte un site pour un coffee shop ?",
        answer:
          "À partir de 490 € à la création, puis 30 €/mois pour le nom de domaine, l'hébergement et les mises à jour. Le détail est sur la page des tarifs.",
      },
      {
        question: "J'ai déjà un Instagram, ai-je vraiment besoin d'un site ?",
        answer:
          "Instagram complète bien un site mais ne le remplace pas : vous n'apparaissez pas sur Google et vous dépendez de l'algorithme. Un site vous rend trouvable et reste à vous.",
      },
      {
        question: "Puis-je afficher ma carte et mes horaires ?",
        answer:
          "Oui : carte, horaires, adresse, galerie photo et liens vers vos réseaux, tout est prévu.",
      },
      {
        question: "Je ne suis pas à Caen, c'est possible ?",
        answer:
          "Oui. Je travaille à distance partout en France, le site se livre sans déplacement.",
      },
    ],
    ctaTitle: "Envie d'un site pour votre coffee shop ?",
    ctaText:
      "Dites-moi en deux lignes votre projet, je vous réponds avec une estimation claire.",
  },
  {
    slug: "restaurant",
    navLabel: "Restaurant",
    serviceName: "Création de site internet pour restaurant",
    metaTitle: "Création de site internet pour restaurant, dès 490 €",
    metaDescription:
      "Un site web moderne pour votre restaurant : carte, horaires, réservation et visibilité sur Google. Changement de carte compris dans l'abonnement. Dès 490 €. Freelance à Caen, partout en France.",
    breadcrumbLabel: "Site internet pour restaurant",
    h1: "Un site internet pour votre restaurant",
    lead: "Vos clients regardent votre carte et vos horaires en ligne avant de réserver. Un site clair et moderne les rassure, met l'eau à la bouche et vous rend visible sur Google quand on cherche où manger dans le coin. Dès 490 €.",
    enjeuxTitle: "Pourquoi un site pour votre restaurant",
    enjeux: [
      {
        title: "Être trouvé sur Google",
        body: "Quand on cherche un restaurant dans votre ville, un site bien référencé vous fait apparaître, avec votre adresse, vos horaires et votre carte.",
      },
      {
        title: "Donner envie de réserver",
        body: "Photos de vos plats, de la salle, de l'ambiance : on donne envie de venir avant même de pousser la porte.",
      },
      {
        title: "Une carte qui évolue sans surcoût",
        body: "Vous changez de menu chaque saison ? La mise à jour de la carte est comprise dans l'abonnement de 30 €/mois, il suffit de me l'envoyer.",
      },
      {
        title: "Réservation et contact simplifiés",
        body: "Numéro de téléphone cliquable, formulaire, lien vers votre outil de réservation : on met en avant ce qui aide à remplir la salle.",
      },
    ],
    examples: [
      {
        description: "Un site exemple complet pour restaurant, en ligne.",
        href: "https://site-pf-2.vercel.app/",
        image: {
          src: "/projects/restaurant.png",
          alt: "Aperçu du site exemple pour restaurant",
          width: 1618,
          height: 910,
        },
      },
    ],
    faq: [
      {
        question: "Combien coûte un site pour un restaurant ?",
        answer:
          "À partir de 490 € à la création, puis 30 €/mois pour le nom de domaine, l'hébergement et les mises à jour. Le détail est sur la page des tarifs.",
      },
      {
        question: "Puis-je changer ma carte régulièrement ?",
        answer:
          "Oui. La mise à jour de votre carte est comprise dans l'abonnement de 30 €/mois : vous m'envoyez les changements et je les mets en ligne.",
      },
      {
        question: "Peut-on ajouter la réservation en ligne ?",
        answer:
          "Oui : lien vers votre outil de réservation, numéro de téléphone cliquable ou formulaire de contact, selon ce que vous préférez.",
      },
      {
        question: "Je ne suis pas à Caen, c'est possible ?",
        answer:
          "Oui. Je travaille à distance partout en France, le site se livre sans déplacement.",
      },
    ],
    ctaTitle: "Envie d'un site pour votre restaurant ?",
    ctaText:
      "Dites-moi en deux lignes votre projet, je vous réponds avec une estimation claire.",
  },
  {
    slug: "boulangerie",
    navLabel: "Boulangerie",
    serviceName: "Création de site internet pour boulangerie",
    metaTitle: "Création de site internet pour boulangerie, dès 490 €",
    metaDescription:
      "Un site web moderne pour votre boulangerie : produits, horaires, commandes et visibilité sur Google. Dès 490 €, livré rapidement. Freelance à Caen, partout en France.",
    breadcrumbLabel: "Site internet pour boulangerie",
    h1: "Un site internet pour votre boulangerie",
    lead: "Vos clients cherchent vos horaires, vos produits et savoir si vous prenez les commandes avant de passer. Un site clair les renseigne et vous rend visible sur Google quand on cherche une boulangerie dans le coin. Dès 490 €.",
    enjeuxTitle: "Pourquoi un site pour votre boulangerie",
    enjeux: [
      {
        title: "Sortir sur Google",
        body: "Quand on cherche une boulangerie près de soi, un site bien référencé vous fait apparaître, avec vos horaires et votre adresse.",
      },
      {
        title: "Mettre vos produits en valeur",
        body: "Pains, viennoiseries, pâtisseries, gâteaux sur commande : de belles photos donnent envie.",
      },
      {
        title: "Annoncer horaires et fermetures",
        body: "Jours de fermeture, congés, horaires de fêtes : une info à jour évite à vos clients de se déplacer pour rien.",
      },
      {
        title: "Faciliter les commandes",
        body: "Gâteaux d'occasion, commandes de pain : on met en avant un numéro de téléphone cliquable ou un formulaire pour réserver.",
      },
    ],
    examples: [
      {
        description: "Un site exemple complet pour boulangerie, en ligne.",
        href: "https://site-pf-1.vercel.app/",
        image: {
          src: "/projects/boulangerie.png",
          alt: "Aperçu du site exemple pour boulangerie",
          width: 1618,
          height: 910,
        },
      },
    ],
    faq: [
      {
        question: "Combien coûte un site pour une boulangerie ?",
        answer:
          "À partir de 490 € à la création, puis 30 €/mois pour le nom de domaine, l'hébergement et les mises à jour. Le détail est sur la page des tarifs.",
      },
      {
        question: "Puis-je afficher mes produits et mes horaires ?",
        answer:
          "Oui : vos produits en photo, vos horaires, vos jours de fermeture et votre adresse, tout est prévu.",
      },
      {
        question: "Peut-on gérer les commandes (gâteaux, pain) ?",
        answer:
          "Oui : numéro de téléphone cliquable ou formulaire de réservation pour que vos clients commandent facilement.",
      },
      {
        question: "Je ne suis pas à Caen, c'est possible ?",
        answer:
          "Oui. Je travaille à distance partout en France, le site se livre sans déplacement.",
      },
    ],
    ctaTitle: "Envie d'un site pour votre boulangerie ?",
    ctaText:
      "Dites-moi en deux lignes votre projet, je vous réponds avec une estimation claire.",
  },
  {
    slug: "architecte-interieur",
    navLabel: "Architecte d'intérieur",
    serviceName: "Création de site internet pour architecte d'intérieur",
    metaTitle: "Création de site internet pour architecte d'intérieur, dès 490 €",
    metaDescription:
      "Un site web soigné pour architecte ou décorateur d'intérieur : portfolio de vos réalisations, identité forte et visibilité sur Google. Dès 490 €. Freelance à Caen, partout en France.",
    breadcrumbLabel: "Site internet pour architecte d'intérieur",
    h1: "Un site internet pour votre activité d'architecte d'intérieur",
    lead: "Pour un architecte d'intérieur, le site n'est pas un détail : c'est la première preuve de votre sens du design. Un site clair, épuré et soigné met en valeur vos réalisations, inspire confiance et vous rend visible sur Google quand on cherche un architecte ou un décorateur d'intérieur. Dès 490 €.",
    enjeuxTitle: "Pourquoi un site soigné est essentiel pour un architecte d'intérieur",
    enjeux: [
      {
        title: "Votre site prouve votre œil",
        body: "Pour un métier du design, un site daté ou brouillon décrédibilise. Un site épuré et bien composé montre tout de suite votre niveau d'exigence.",
      },
      {
        title: "Mettre vos réalisations en valeur",
        body: "Un portfolio soigné, de belles photos avant/après, des projets bien présentés : on donne envie de vous confier un intérieur.",
      },
      {
        title: "Sortir sur Google",
        body: "Quand on cherche un architecte ou un décorateur d'intérieur dans votre région, un site bien référencé vous fait apparaître avec votre univers et vos coordonnées.",
      },
      {
        title: "Inspirer confiance avant le premier rendez-vous",
        body: "Présentation de votre démarche, de votre parcours et de vos honoraires : un site clair rassure des clients qui s'apprêtent à investir dans leur lieu de vie.",
      },
    ],
    examples: [
      {
        description:
          "Atelier Lumé, un site exemple d'architecte d'intérieur au design soigné, en ligne.",
        href: "https://atelier-lume-kappa.vercel.app/",
        image: {
          src: "/projects/atelier-lume.png",
          alt: "Aperçu du site exemple pour architecte d'intérieur Atelier Lumé",
          width: 1618,
          height: 910,
        },
      },
    ],
    faq: [
      {
        question: "Combien coûte un site pour un architecte d'intérieur ?",
        answer:
          "À partir de 490 € à la création, puis 30 €/mois pour le nom de domaine, l'hébergement et les mises à jour. Le détail est sur la page des tarifs.",
      },
      {
        question: "Pourquoi un site soigné est-il si important pour ce métier ?",
        answer:
          "Parce que votre site est une vitrine de votre travail : un visiteur juge votre sens du design en quelques secondes. Un site épuré et bien construit inspire confiance et reflète la qualité de vos projets.",
      },
      {
        question: "Peut-on présenter mon portfolio et mes réalisations ?",
        answer:
          "Oui : galeries de projets, photos avant/après, descriptions de chantiers et témoignages clients, tout est prévu pour valoriser votre travail.",
      },
      {
        question: "Je ne suis pas à Caen, c'est possible ?",
        answer:
          "Oui. Je travaille à distance partout en France, le site se livre sans déplacement.",
      },
    ],
    ctaTitle: "Envie d'un site à la hauteur de vos projets ?",
    ctaText:
      "Dites-moi en deux lignes votre projet, je vous réponds avec une estimation claire.",
  },
  {
    slug: "bistrot-brasserie",
    navLabel: "Bistrot et brasserie",
    serviceName: "Création de site internet pour bistrot et brasserie",
    metaTitle: "Création de site internet pour bistrot ou brasserie, dès 490 €",
    metaDescription:
      "Un site web convivial pour votre bistrot ou brasserie : ardoise du jour, formules, horaires et visibilité sur Google. Dès 490 €. Freelance à Caen, partout en France.",
    breadcrumbLabel: "Site internet pour bistrot ou brasserie",
    h1: "Un site internet pour votre bistrot ou brasserie",
    lead: "Un bon bistrot se vit autant qu'il se mange. Un site clair et chaleureux met en avant votre ardoise du jour, vos formules et votre ambiance, et vous rend visible sur Google quand on cherche un bistrot ou une brasserie dans le coin. Dès 490 €.",
    enjeuxTitle: "Pourquoi un site pour votre bistrot ou brasserie",
    enjeux: [
      {
        title: "Sortir sur Google",
        body: "Quand on cherche un bistrot ou une brasserie près de soi, un site bien référencé vous fait apparaître, avec votre adresse, vos horaires et votre carte.",
      },
      {
        title: "Faire passer l'ambiance",
        body: "Photos de la salle, du comptoir, de l'assiette : on retrouve en ligne l'esprit convivial qui fait revenir vos habitués.",
      },
      {
        title: "Une ardoise qui change sans surcoût",
        body: "Plat du jour, formule de midi, suggestions : la mise à jour de votre carte est comprise dans l'abonnement de 30 €/mois, il suffit de me l'envoyer.",
      },
      {
        title: "Réservation et contact simplifiés",
        body: "Numéro de téléphone cliquable, formulaire, lien vers votre outil de réservation : on met en avant ce qui aide à remplir la salle.",
      },
    ],
    examples: [
      {
        description: "Le Cerf Doré, un site exemple complet pour bistrot, en ligne.",
        href: "https://cerf-dore.vercel.app/",
        image: {
          src: "/projects/cerf-dore.png",
          alt: "Aperçu du site exemple pour bistrot Le Cerf Doré",
          width: 1618,
          height: 910,
        },
      },
    ],
    faq: [
      {
        question: "Combien coûte un site pour un bistrot ou une brasserie ?",
        answer:
          "À partir de 490 € à la création, puis 30 €/mois pour le nom de domaine, l'hébergement et les mises à jour. Le détail est sur la page des tarifs.",
      },
      {
        question: "Puis-je changer mon ardoise et mes formules régulièrement ?",
        answer:
          "Oui. La mise à jour de votre carte et de votre plat du jour est comprise dans l'abonnement de 30 €/mois : vous m'envoyez les changements et je les mets en ligne.",
      },
      {
        question: "Peut-on ajouter la réservation en ligne ?",
        answer:
          "Oui : lien vers votre outil de réservation, numéro de téléphone cliquable ou formulaire de contact, selon ce que vous préférez.",
      },
      {
        question: "Je ne suis pas à Caen, c'est possible ?",
        answer:
          "Oui. Je travaille à distance partout en France, le site se livre sans déplacement.",
      },
    ],
    ctaTitle: "Envie d'un site pour votre bistrot ?",
    ctaText:
      "Dites-moi en deux lignes votre projet, je vous réponds avec une estimation claire.",
  },
];

export function getMetier(slug: string): Metier | undefined {
  return METIERS.find((metier) => metier.slug === slug);
}
