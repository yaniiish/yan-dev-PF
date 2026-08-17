/**
 * Contenu de la page /mentions-legales. Cf. CONTENT.md §14.
 *
 * Page FR uniquement : elle ne cible aucune requête et n'a pas d'équivalent
 * anglais, comme l'index métiers et les fiches métier (cf. SEO.md §7).
 *
 * ATTENTION, limite assumée par Yan (décision du 2026-08-17) : la LCEN impose
 * d'identifier l'éditeur par son nom de personne physique et par l'adresse de
 * son siège. Yan a choisi de ne publier ni son nom, ni sa rue. La page reste
 * donc incomplète au regard de cette obligation. Ce n'est pas un oubli : ne
 * pas « corriger » en ajoutant un nom ou une adresse sans son accord explicite.
 */

export const LEGAL = {
  path: "/mentions-legales",
  navLabel: "Mentions légales",
  breadcrumbLabel: "Mentions légales",
  metaTitle: "Mentions légales",
  metaDescription:
    "Mentions légales du site yan-dev.fr : éditeur, hébergeur, propriété intellectuelle et traitement des données personnelles.",
  h1: "Mentions légales",
  lead: "Informations légales relatives au site yan-dev.fr et à son éditeur.",
  sections: [
    {
      id: "editeur",
      title: "Éditeur du site",
      rows: [
        { label: "Dénomination", value: "Yan-dev" },
        { label: "Forme juridique", value: "Entreprise individuelle" },
        { label: "SIRET", value: "103 986 790 00014" },
        { label: "Siège", value: "Caen (14000), France" },
        { label: "Contact", value: "contact@yan-dev.fr" },
        {
          label: "TVA",
          value: "TVA non applicable, article 293 B du Code général des impôts",
        },
      ],
      body: [
        "Les prix indiqués sur ce site sont donc nets de taxe.",
      ],
    },
    {
      id: "publication",
      title: "Directeur de la publication",
      rows: [],
      body: [
        "La direction de la publication est assurée par le représentant légal de Yan-dev, joignable à l'adresse contact@yan-dev.fr.",
      ],
    },
    {
      id: "hebergeur",
      title: "Hébergeur",
      rows: [
        { label: "Société", value: "Vercel Inc." },
        {
          label: "Adresse",
          value: "440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis",
        },
        { label: "Site", value: "vercel.com" },
      ],
      body: [],
    },
    {
      id: "propriete",
      title: "Propriété intellectuelle",
      rows: [],
      body: [
        "L'ensemble des contenus de ce site (textes, mise en page, éléments graphiques et code) est la propriété de Yan-dev, sauf mention contraire. Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable, est interdite.",
        "Les sites présentés à titre d'exemple restent la propriété de leurs auteurs respectifs. Les visuels qui les illustrent sont utilisés à des fins de démonstration.",
      ],
    },
    {
      id: "donnees",
      title: "Données personnelles",
      rows: [],
      body: [
        "Le formulaire de contact collecte uniquement les informations que vous y saisissez : votre adresse email, votre activité et votre message, ainsi qu'un numéro de téléphone si vous choisissez de le renseigner. Ces données sont transmises par email et servent exclusivement à répondre à votre demande.",
        "Elles ne sont ni revendues, ni cédées, ni utilisées à des fins publicitaires, et sont conservées le temps nécessaire au traitement de votre demande et au suivi de la relation qui pourrait en découler.",
        "Conformément au Règlement général sur la protection des données, vous disposez d'un droit d'accès, de rectification, d'opposition et de suppression des données vous concernant. Pour l'exercer, écrivez à contact@yan-dev.fr.",
      ],
    },
    {
      id: "cookies",
      title: "Cookies et mesure d'audience",
      rows: [],
      body: [
        "Ce site n'utilise aucun cookie de mesure d'audience, aucun traceur publicitaire et aucun outil d'analyse tiers. Aucun bandeau de consentement n'est donc nécessaire.",
      ],
    },
  ],
} as const;
