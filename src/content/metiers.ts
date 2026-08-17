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
  pricingCallout: "À partir de 490 €, selon le périmètre du projet.",
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
  metaTitle: "Création de site internet commerçant ou artisan, dès 490 €",
  metaDescription:
    "Un site vitrine moderne pour votre commerce, quel que soit votre métier : visibilité sur Google, infos à jour, dès 490 €. Exemples par métier. Freelance à Caen.",
  h1: "Un site internet pour votre métier",
  lead: "Coffee shop, restaurant, boulangerie ou toute autre activité : je conçois des sites vitrines clairs et modernes, adaptés à votre métier, qui vous rendent visible sur Google. Dès 490 €.",
  /**
   * Blocs de contenu de fond. La page n'était qu'une grille de vignettes
   * (environ 130 mots), pour un titre qui cible une requête commerciale :
   * c'était le principal risque de contenu mince du site.
   */
  contenuLabel: "Le principe",
  contenuTitle: "Ce que contient un site vitrine de commerçant",
  contenuLead:
    "Quel que soit votre métier, un visiteur qui arrive sur votre site cherche presque toujours les mêmes choses, et dans le même ordre. Un bon site vitrine y répond sans le faire chercher.",
  contenuItems: [
    {
      title: "Vos informations pratiques",
      body: "Adresse, horaires, jours de fermeture, téléphone : ce sont les premières choses qu'on vient vérifier, souvent depuis un téléphone et souvent juste avant de se déplacer. Elles doivent être lisibles sans zoomer et sans scroller longtemps.",
    },
    {
      title: "Ce que vous proposez",
      body: "Votre carte, vos prestations, votre gamme ou vos réalisations selon votre activité. C'est ce qui permet au visiteur de se décider, et c'est aussi ce que Google lit pour comprendre de quoi parle votre site.",
    },
    {
      title: "Des photos de votre univers",
      body: "Votre lieu, vos produits, votre travail. Sur un site de commerce, les photos font une bonne partie de la décision : elles montrent ce qu'un texte ne peut pas dire.",
    },
    {
      title: "Un moyen simple de vous joindre",
      body: "Un numéro cliquable depuis un mobile, un formulaire, un lien vers votre outil de réservation ou vers vos réseaux. L'objectif est qu'un visiteur intéressé n'ait jamais à chercher comment vous contacter.",
    },
  ],
  metierTitle: "Ce qui change d'un métier à l'autre",
  metierBody: [
    "Le socle est commun, mais l'accent ne se met pas au même endroit. Un restaurant a besoin d'une carte facile à mettre à jour et d'un accès direct à la réservation. Un architecte d'intérieur a besoin d'un portfolio qui met ses réalisations en valeur, parce que son site est la première preuve de son sens du design. Une brasserie artisanale a besoin de présenter sa gamme et d'indiquer où trouver ses bières.",
    "C'est à cela que servent les pages ci-dessous : elles montrent, métier par métier, ce qui compte vraiment et à quoi ressemble le résultat. Si votre activité n'y figure pas, le principe reste exactement le même.",
  ],
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
      "Un site web moderne pour votre coffee shop ou votre café : carte, horaires, ambiance et visibilité sur Google. Dès 490 €, livré rapidement. Freelance à Caen.",
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
      {
        description: "Fougère, un site exemple pour coffee shop et salon de thé, en ligne.",
        href: "https://fougere-ten.vercel.app/",
        image: {
          src: "/projects/fougere.png",
          alt: "Aperçu du site exemple pour coffee shop Fougère",
          width: 1618,
          height: 910,
        },
      },
    ],
    faq: [
      {
        question: "Combien coûte un site pour un coffee shop ?",
        answer:
          "À partir de 490 €. Le tarif dépend surtout de ce que vous voulez montrer : une page avec votre carte, vos horaires et quelques photos coûte moins qu'un site avec galerie complète et agenda d'événements. L'option Sérénité à 30 €/mois prend ensuite en charge le domaine, l'hébergement et les mises à jour, si vous préférez ne rien gérer.",
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
        question: "Mon coffee shop n'est pas à Caen, est-ce que ça change quelque chose ?",
        answer:
          "Non. Tout se fait à distance : vous m'envoyez vos photos, votre carte et vos infos, et on échange par message ou en visio. Le référencement, lui, cible bien votre ville et pas la mienne.",
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
      "Un site moderne pour votre restaurant : carte, horaires, réservation, visibilité sur Google. Changement de carte compris dans l'option Sérénité. Dès 490 €.",
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
        title: "Une carte qui évolue facilement",
        body: "Vous changez de menu chaque saison ? Avec l'option Sérénité à 30 €/mois, la mise à jour de la carte est comprise : il suffit de me l'envoyer.",
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
          "À partir de 490 €. Le tarif dépend du nombre de pages et des fonctionnalités : une carte et vos horaires coûtent moins qu'un site avec menus détaillés, réservation en ligne et galerie. L'option Sérénité à 30 €/mois couvre ensuite le domaine, l'hébergement et les mises à jour de carte, si vous préférez ne rien gérer.",
      },
      {
        question: "Puis-je changer ma carte régulièrement ?",
        answer:
          "Oui. Si vous prenez l'option Sérénité à 30 €/mois, la mise à jour de votre carte est comprise : vous m'envoyez les changements et je les mets en ligne.",
      },
      {
        question: "Peut-on ajouter la réservation en ligne ?",
        answer:
          "Oui : lien vers votre outil de réservation, numéro de téléphone cliquable ou formulaire de contact, selon ce que vous préférez.",
      },
      {
        question: "Faut-il qu'on se rencontre pour lancer le projet ?",
        answer:
          "Ce n'est pas nécessaire. Je travaille à distance avec des restaurants partout en France : vous m'envoyez votre carte et vos photos, on cale le reste par message ou en visio.",
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
      "Un site web moderne pour votre boulangerie : produits, horaires, commandes et visibilité sur Google. Dès 490 €, livré rapidement. Freelance à Caen.",
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
          "À partir de 490 €. Le tarif dépend de ce que vous présentez : vos horaires et vos produits phares coûtent moins qu'un site détaillant toute votre gamme avec un système de commande. L'option Sérénité à 30 €/mois prend ensuite en charge le domaine, l'hébergement et les mises à jour, si vous préférez ne rien gérer.",
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
        question: "Ma boulangerie n'est pas dans le Calvados, c'est possible ?",
        answer:
          "Oui, sans difficulté. Le site se conçoit et se livre à distance, et il est référencé sur votre commune, pas sur la mienne.",
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
    metaTitle: "Création de site pour architecte d'intérieur, dès 490 €",
    metaDescription:
      "Un site web soigné pour architecte ou décorateur d'intérieur : portfolio de vos réalisations, identité forte et visibilité sur Google. Dès 490 €.",
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
          "À partir de 490 €. Pour ce métier, le tarif dépend surtout du portfolio : le nombre de projets à présenter, la quantité de photos et le soin apporté à leur mise en page. L'option Sérénité à 30 €/mois couvre ensuite le domaine, l'hébergement et l'ajout de vos nouveaux projets, si vous préférez ne rien gérer.",
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
        question: "Travaillez-vous avec des architectes hors de Normandie ?",
        answer:
          "Oui. C'est même le cas le plus fréquent pour ce métier : tout se fait à distance, à partir des photos de vos projets et de quelques échanges sur l'univers que vous voulez donner au site.",
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
    metaTitle: "Création de site pour bistrot ou brasserie, dès 490 €",
    metaDescription:
      "Un site web convivial pour votre bistrot ou brasserie : ardoise du jour, formules, horaires et visibilité sur Google. Dès 490 €. Freelance à Caen.",
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
        title: "Une ardoise qui change facilement",
        body: "Plat du jour, formule de midi, suggestions : avec l'option Sérénité à 30 €/mois, la mise à jour de votre carte est comprise, il suffit de me l'envoyer.",
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
          "À partir de 490 €. Le tarif dépend du nombre de pages et des fonctionnalités : vos formules et vos horaires coûtent moins qu'un site avec ardoise détaillée, réservation et galerie. L'option Sérénité à 30 €/mois couvre ensuite le domaine, l'hébergement et les mises à jour de carte, si vous préférez ne rien gérer.",
      },
      {
        question: "Puis-je changer mon ardoise et mes formules régulièrement ?",
        answer:
          "Oui. Si vous prenez l'option Sérénité à 30 €/mois, la mise à jour de votre carte et de votre plat du jour est comprise : vous m'envoyez les changements et je les mets en ligne.",
      },
      {
        question: "Peut-on ajouter la réservation en ligne ?",
        answer:
          "Oui : lien vers votre outil de réservation, numéro de téléphone cliquable ou formulaire de contact, selon ce que vous préférez.",
      },
      {
        question: "Mon établissement n'est pas à Caen, est-ce un problème ?",
        answer:
          "Non. Je travaille à distance partout en France, sans déplacement, et le site est référencé sur votre ville.",
      },
    ],
    ctaTitle: "Envie d'un site pour votre bistrot ?",
    ctaText:
      "Dites-moi en deux lignes votre projet, je vous réponds avec une estimation claire.",
  },
  {
    slug: "tatoueur",
    navLabel: "Tatoueur",
    serviceName: "Création de site internet pour tatoueur",
    metaTitle: "Création de site internet pour tatoueur, dès 490 €",
    metaDescription:
      "Un site web à l'image de votre studio de tatouage : galerie de vos réalisations, univers, prise de rendez-vous et visibilité sur Google. Dès 490 €.",
    breadcrumbLabel: "Site internet pour tatoueur",
    h1: "Un site internet pour votre activité de tatoueur",
    lead: "Pour un tatoueur, le site est le prolongement de votre univers : c'est là qu'on juge votre style avant de vous confier sa peau. Un site à votre image met en valeur votre galerie, affirme votre identité et vous rend visible sur Google quand on cherche un tatoueur dans le coin. Dès 490 €.",
    enjeuxTitle: "Pourquoi un site à votre image pour votre studio de tatouage",
    enjeux: [
      {
        title: "Un site qui porte votre univers",
        body: "Votre style fait votre signature. Un site graphique et soigné plonge le visiteur dans votre univers avant même qu'il pousse la porte du studio.",
      },
      {
        title: "Mettre votre galerie en valeur",
        body: "Réalisations, flashs disponibles, projets sur mesure : de belles photos bien présentées donnent envie de prendre rendez-vous avec vous plutôt qu'avec un autre.",
      },
      {
        title: "Être trouvé sur Google",
        body: "Quand on cherche un tatoueur dans votre ville ou un style précis, un site bien référencé vous fait apparaître, avec votre univers, vos coordonnées et votre galerie.",
      },
      {
        title: "Faciliter la prise de rendez-vous",
        body: "Formulaire de demande de projet, lien vers votre agenda, numéro cliquable ou renvoi vers Instagram : on met en avant ce qui déclenche le premier contact.",
      },
    ],
    examples: [
      {
        description:
          "Madman Tattoo, un site exemple pour salon de tatouage à l'univers affirmé, en ligne.",
        href: "https://madman-tattoo.vercel.app/",
        image: {
          src: "/projects/madman-tattoo.jpg",
          alt: "Aperçu du site exemple pour tatoueur Madman Tattoo",
          width: 1618,
          height: 910,
        },
      },
    ],
    faq: [
      {
        question: "Combien coûte un site pour un tatoueur ?",
        answer:
          "À partir de 490 €. Le tarif dépend surtout de votre galerie : le nombre de réalisations à présenter et le travail graphique nécessaire pour que le site porte vraiment votre univers. L'option Sérénité à 30 €/mois couvre ensuite le domaine, l'hébergement et l'ajout de vos nouvelles pièces, si vous préférez ne rien gérer.",
      },
      {
        question: "Peut-on présenter ma galerie et mes flashs ?",
        answer:
          "Oui : galeries de réalisations, flashs disponibles, styles et projets sur mesure, tout est prévu pour mettre votre travail en valeur.",
      },
      {
        question: "J'ai déjà un Instagram, ai-je vraiment besoin d'un site ?",
        answer:
          "Instagram complète bien un site mais ne le remplace pas : vous n'apparaissez pas sur Google et vous dépendez de l'algorithme. Un site vous rend trouvable, affirme votre univers et reste à vous.",
      },
      {
        question: "Mon studio est loin de Caen, comment on travaille ?",
        answer:
          "À distance, par message ou en visio. Vous m'envoyez vos photos et vos références visuelles, je vous propose une direction, et on ajuste jusqu'à ce que le site vous ressemble.",
      },
    ],
    ctaTitle: "Envie d'un site à l'image de votre studio ?",
    ctaText:
      "Dites-moi en deux lignes votre projet, je vous réponds avec une estimation claire.",
  },
  {
    slug: "brasserie-artisanale",
    navLabel: "Brasserie artisanale",
    serviceName: "Création de site internet pour brasserie artisanale",
    metaTitle: "Création de site pour brasserie artisanale, dès 490 €",
    metaDescription:
      "Un site web moderne pour votre brasserie artisanale : gamme de bières, savoir-faire, points de vente et visibilité sur Google. Dès 490 €. Freelance à Caen.",
    breadcrumbLabel: "Site internet pour brasserie artisanale",
    h1: "Un site internet pour votre brasserie artisanale",
    lead: "Votre bière se boit d'abord avec les yeux. Un site clair et soigné présente votre gamme, raconte votre savoir-faire et indique où vous trouver, tout en vous rendant visible sur Google quand on cherche une bière artisanale ou une brasserie dans la région. Dès 490 €.",
    enjeuxTitle: "Pourquoi un site pour votre brasserie artisanale",
    enjeux: [
      {
        title: "Être trouvé sur Google",
        body: "Quand on cherche une bière artisanale ou une brasserie près de chez soi, un site bien référencé vous fait apparaître, avec votre gamme, vos points de vente et vos coordonnées.",
      },
      {
        title: "Présenter votre gamme de bières",
        body: "Blonde, ambrée, IPA, brassins de saison : chaque bière a sa fiche, son style, ses arômes et son degré. On donne envie de goûter avant même d'ouvrir la bouteille.",
      },
      {
        title: "Raconter votre savoir-faire",
        body: "Votre histoire, vos ingrédients, votre méthode de brassage et votre ancrage local : c'est ce qui distingue une bière artisanale d'une bière industrielle, et ce qui crée l'attachement.",
      },
      {
        title: "Indiquer où vous déguster et acheter",
        body: "Points de vente, bars partenaires, marchés, visites et dégustations à la brasserie : on met en avant tout ce qui aide vos clients à trouver vos bières.",
      },
    ],
    examples: [
      {
        description:
          "BeerBee, un site exemple pour brasserie artisanale à l'univers immersif, en ligne.",
        href: "https://brasserie-beerbee.vercel.app/",
        image: {
          src: "/projects/brasserie-beerbee.jpg",
          alt: "Aperçu du site exemple pour brasserie artisanale BeerBee",
          width: 1618,
          height: 910,
        },
      },
    ],
    faq: [
      {
        question: "Combien coûte un site pour une brasserie artisanale ?",
        answer:
          "À partir de 490 €. Le tarif dépend de l'ampleur de votre gamme : quelques bières et vos points de vente coûtent moins qu'un site avec une fiche par référence et vos brassins de saison. L'option Sérénité à 30 €/mois couvre ensuite le domaine, l'hébergement et les mises à jour, si vous préférez ne rien gérer.",
      },
      {
        question: "Puis-je présenter toute ma gamme de bières ?",
        answer:
          "Oui : une fiche par bière avec le style, les arômes, le degré et le format, et la possibilité d'ajouter vos brassins de saison au fil de l'année.",
      },
      {
        question: "Peut-on indiquer mes points de vente et mes visites ?",
        answer:
          "Oui : liste de vos points de vente et bars partenaires, informations sur les visites et dégustations, et un formulaire ou un numéro cliquable pour vous contacter.",
      },
      {
        question: "Ma brasserie n'est pas en Normandie, est-ce possible ?",
        answer:
          "Oui. Tout se fait à distance, et le site met en avant vos points de vente et votre zone à vous, quelle qu'elle soit.",
      },
    ],
    ctaTitle: "Envie d'un site pour votre brasserie ?",
    ctaText:
      "Dites-moi en deux lignes votre projet, je vous réponds avec une estimation claire.",
  },
];

export function getMetier(slug: string): Metier | undefined {
  return METIERS.find((metier) => metier.slug === slug);
}
