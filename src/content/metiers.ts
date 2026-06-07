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
  example: MetierExample;
  faq: readonly MetierFaq[];
  ctaTitle: string;
  ctaText: string;
};

/** Libellés de structure partagés par toutes les pages métier. */
export const METIER_LABELS = {
  enjeux: "Pourquoi",
  example: "Exemple",
  exampleTitle: "Un exemple concret",
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
    example: {
      description: "Un site exemple complet pour coffee shop, en ligne.",
      href: "https://greencp-test.vercel.app/",
      image: {
        src: "/projects/coffee.png",
        alt: "Aperçu du site exemple pour coffee shop",
        width: 1618,
        height: 910,
      },
    },
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
];

export function getMetier(slug: string): Metier | undefined {
  return METIERS.find((metier) => metier.slug === slug);
}
