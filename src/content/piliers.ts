/**
 * Contenu des deux pages de pilier : /site-web-creatif et /produit-digital.
 * Cf. CONTENT.md §15.
 *
 * Ces pages comblent le principal écart relevé par l'audit (P2-10) : le site
 * annonce trois piliers mais seul le pilier vitrine disposait d'une page
 * d'atterrissage (/prix-site-vitrine) et d'un réseau de pages d'intention
 * (/site-internet/*). Les requêtes de l'étage 2 côté créatif et produit
 * (SEO.md §2) n'avaient aucune page cible.
 *
 * Pages FR uniquement, comme le reste du réseau d'intention (SEO.md §7).
 *
 * Règle de véracité : aucun délai annoncé, aucun tarif chiffré sur ces deux
 * offres (elles sont sur devis), aucune statistique, aucun témoignage. Les
 * projets illustrant ces pages ne sont jamais présentés comme des commandes
 * client.
 */

export type PilierFaq = { question: string; answer: string };
export type PilierPoint = { title: string; body: string };

export type Pilier = {
  path: string;
  navLabel: string;
  breadcrumbLabel: string;
  serviceName: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  pointsLabel: string;
  pointsTitle: string;
  pointsLead: string;
  points: readonly PilierPoint[];
  compareTitle: string;
  compareBody: readonly string[];
  examplesLabel: string;
  examplesTitle: string;
  examplesLead: string;
  faqLabel: string;
  faqTitle: string;
  faq: readonly PilierFaq[];
  ctaTitle: string;
  ctaText: string;
  ctaLabel: string;
  ctaSecondaryLabel: string;
  /** Libellé du lien de maillage depuis la section Tarifs de la home. */
  sectionLinkLabel: string;
};

export const PILIER_CREATIF: Pilier = {
  path: "/site-web-creatif",
  navLabel: "Site web créatif",
  breadcrumbLabel: "Site web créatif",
  serviceName: "Création de site web créatif",
  metaTitle: "Site web créatif sur mesure, par un développeur freelance",
  metaDescription:
    "Un site avec une vraie direction artistique : animations, interactions et univers sur mesure, sans sacrifier la lisibilité. Sur devis. Freelance à Caen.",
  h1: "Un site web créatif, pensé comme une expérience",
  lead: "Quand le site doit faire plus qu'informer : porter un univers, se distinguer d'un concurrent qui a le même métier que vous, et donner envie de rester. C'est un travail de direction artistique autant que de développement.",

  pointsLabel: "Le contenu",
  pointsTitle: "Ce que comprend un site créatif",
  pointsLead:
    "Un site créatif reprend tout ce que contient un site vitrine, puis va plus loin sur quatre points.",
  points: [
    {
      title: "Une direction artistique poussée",
      body: "Typographie, couleurs, composition, rythme des pages : chaque choix est fait pour votre marque et porte son univers. C'est ce qui fait qu'on reconnaît le site, et qu'il ne ressemble pas à celui du concurrent d'en face.",
    },
    {
      title: "Des animations et des interactions utiles",
      body: "Un mouvement au bon endroit guide le regard, marque une transition ou récompense une action. Mal dosé, il fatigue et ralentit. L'enjeu est de savoir où s'arrêter, et c'est là que se joue la différence entre un site vivant et un site qui en fait trop.",
    },
    {
      title: "Une expérience plus immersive",
      body: "Le parcours est construit comme un récit : ce qu'on voit en premier, ce qui se dévoile en descendant, ce qui reste en tête à la fin. La navigation sert le propos au lieu de le découper en rubriques.",
    },
    {
      title: "Des intégrations spécifiques",
      body: "Réservation, catalogue, carte interactive, contenu géré à distance, connexion à vos outils existants : ce qui manque au format vitrine peut être développé sur mesure.",
    },
  ],

  compareTitle: "Site vitrine ou site créatif ?",
  compareBody: [
    "Le site vitrine répond à un besoin précis : être trouvable, montrer ce que vous faites, permettre de vous joindre. Pour beaucoup d'activités, c'est exactement ce qu'il faut, et y ajouter des effets ne servirait à rien.",
    "Le site créatif s'adresse aux projets dont l'image fait partie de l'offre. Une marque qui se distingue par son univers, un lieu dont l'ambiance est l'argument principal, un studio dont le site est la première preuve du travail. Dans ces cas, un site correct mais neutre laisse passer quelque chose.",
    "Si vous hésitez, décrivez-moi le projet : je vous dis franchement lequel des deux formats a du sens, y compris quand la réponse est le moins cher des deux.",
  ],

  examplesLabel: "Exemples",
  examplesTitle: "Des sites créatifs en ligne",
  examplesLead:
    "Chaque site est consultable en ligne, sur mobile comme sur ordinateur.",

  faqLabel: "FAQ",
  faqTitle: "Questions fréquentes",
  faq: [
    {
      question: "Combien coûte un site créatif ?",
      answer:
        "Sur devis, parce que l'écart est trop large pour un tarif de départ honnête : un site créatif d'une page et un site à univers complet avec plusieurs sections animées n'ont pas le même volume de travail. Le prix vous est annoncé avant de commencer, et il ne bouge pas en cours de route.",
    },
    {
      question: "En quoi est-ce différent d'un site vitrine à 490 € ?",
      answer:
        "Les deux sont conçus et développés sur mesure : je ne pars jamais d'un modèle, quelle que soit l'offre. Ce qui change, c'est l'ambition visuelle. Un site vitrine va à l'essentiel, avec une mise en page claire et efficace. Un site créatif ajoute un vrai travail de direction artistique, des animations et un parcours pensé comme une expérience. C'est surtout du temps de conception en plus, avant la première ligne de code.",
    },
    {
      question: "Les animations ne vont-elles pas ralentir le site ?",
      answer:
        "Elles le peuvent, si elles sont ajoutées sans y penser. Les animations sont donc construites pour rester légères, ne pas bloquer l'affichage du contenu, et se désactiver automatiquement pour les visiteurs qui ont demandé à leur système de réduire les animations.",
    },
    {
      question: "Un site créatif est-il bien référencé ?",
      answer:
        "Oui, à condition que le contenu reste lisible par les moteurs. Le texte est présent dans la page et pas généré après coup, la structure des titres est propre, et les pages restent rapides. Un site créatif n'a aucune raison d'être moins bien référencé qu'un autre.",
    },
    {
      question: "Puis-je modifier le site moi-même ensuite ?",
      answer:
        "C'est possible si on le prévoit dès le départ, en rendant modifiables les parties que vous voulez gérer. Sinon, l'option Sérénité couvre les modifications, ou je vous cède le code pour que vous ou un autre développeur puissiez le reprendre.",
    },
  ],

  ctaTitle: "Un projet qui mérite une vraie direction artistique ?",
  ctaText:
    "Décrivez-moi votre activité et l'effet que vous cherchez, je vous réponds avec une proposition claire.",
  ctaLabel: "Parler de mon projet",
  ctaSecondaryLabel: "Voir les tarifs",
  sectionLinkLabel: "Ce que comprend un site créatif",
};

export const PILIER_PRODUIT: Pilier = {
  path: "/produit-digital",
  navLabel: "Produit digital",
  breadcrumbLabel: "Produit digital",
  serviceName: "Conception et développement de produit digital",
  metaTitle: "Développement de produit digital : MVP, SaaS, application",
  metaDescription:
    "De l'idée au produit en ligne : MVP, SaaS, application web ou mobile, dashboard et intégrations IA. Conçu et développé en direct, sur devis.",
  h1: "Transformer une idée en produit digital",
  lead: "Un produit n'est pas un site avec plus de pages. Il a des utilisateurs qui reviennent, des données à gérer, des comptes, parfois des paiements. C'est un autre métier, et c'est celui que j'exerce aussi.",

  pointsLabel: "Le périmètre",
  pointsTitle: "Ce que je construis",
  pointsLead:
    "Du premier prototype jusqu'au produit en production, avec les outils autour.",
  points: [
    {
      title: "Conception produit et MVP",
      body: "Réduire une idée à ce qu'elle a d'essentiel, pour la mettre entre les mains d'utilisateurs sans attendre d'avoir tout construit. C'est l'étape qui évite de développer six mois quelque chose que personne n'utilisera.",
    },
    {
      title: "SaaS et application web",
      body: "Comptes utilisateurs, abonnements, données, droits d'accès, tableau de bord. La partie visible et la partie serveur, développées ensemble plutôt qu'assemblées après coup.",
    },
    {
      title: "Application mobile",
      body: "Une application installable, pensée pour le mobile plutôt qu'un site adapté à un petit écran, avec ce que cela suppose de traitement sur l'appareil et de contraintes propres aux magasins d'applications.",
    },
    {
      title: "Dashboard, back-office et automatisations",
      body: "L'outil interne qui vous permet de gérer votre produit sans passer par moi, les connexions à vos services existants, et les intégrations IA quand elles apportent quelque chose de concret.",
    },
  ],

  compareTitle: "Comment se passe un projet produit",
  compareBody: [
    "On commence par cadrer : ce que le produit doit faire, pour qui, et surtout ce qu'il ne fera pas dans un premier temps. C'est la conversation la plus utile du projet, et souvent celle qui fait le plus économiser.",
    "Vient ensuite une première version fonctionnelle, volontairement réduite, qu'on peut montrer et utiliser. Les décisions suivantes se prennent à partir de ce qui est réel plutôt que sur un document.",
    "Le développement avance ensuite par étapes, chacune donnant quelque chose de testable. Vous voyez le produit se construire au lieu d'attendre une livraison finale.",
  ],

  examplesLabel: "Exemples",
  examplesTitle: "Des produits que je construis",
  examplesLead: "Deux produits développés en propre, du concept au code.",

  faqLabel: "FAQ",
  faqTitle: "Questions fréquentes",
  faq: [
    {
      question: "Combien coûte le développement d'un produit ?",
      answer:
        "Sur devis, après cadrage. Un chiffre annoncé avant d'avoir défini le périmètre n'aurait aucun sens, et vous devriez vous méfier de quiconque vous en donne un. Le cadrage sert justement à sortir un montant sur lequel je peux m'engager.",
    },
    {
      question: "Je n'ai qu'une idée, est-ce trop tôt pour vous contacter ?",
      answer:
        "Non, c'est même le meilleur moment. Une idée encore souple peut être cadrée pour coûter beaucoup moins cher à construire. Une spécification déjà figée laisse moins de marge pour éviter les impasses.",
    },
    {
      question: "Que se passe-t-il si le projet doit évoluer en cours de route ?",
      answer:
        "C'est la règle plutôt que l'exception, et le découpage par étapes est fait pour ça : chaque étape donne quelque chose d'utilisable, ce qui permet de réorienter la suite. Un changement qui sort du périmètre convenu fait l'objet d'un devis à part, annoncé avant d'être engagé.",
    },
    {
      question: "Le produit m'appartient-il ?",
      answer:
        "Oui. Le code et les comptes des services utilisés vous reviennent, et je peux vous les transférer quand vous le souhaitez. Vous n'avez pas besoin de moi pour continuer à exister.",
    },
    {
      question: "Travaillez-vous avec des porteurs de projet hors de Caen ?",
      answer:
        "Oui, et c'est le cas le plus fréquent pour ce type de projet. Tout se fait à distance, par échanges réguliers et démonstrations des versions successives.",
    },
  ],

  ctaTitle: "Une idée de produit à concrétiser ?",
  ctaText:
    "Décrivez-la en quelques lignes, même si elle est encore floue. Je vous réponds avec un premier cadrage.",
  ctaLabel: "Parler de mon idée",
  ctaSecondaryLabel: "Voir mes projets",
  sectionLinkLabel: "Comment se passe un projet produit",
};

export const PILIERS = [PILIER_CREATIF, PILIER_PRODUIT] as const;
