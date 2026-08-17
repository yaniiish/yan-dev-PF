import { HTML_LANG, type Locale } from "@/content/locales";
import { SITE_NAME } from "@/content/site";
import { ORGANIZATION_ID, SITE_URL, WEBSITE_ID } from "@/lib/seo";

/**
 * Builders de données structurées (JSON-LD) par type de page.
 * À rendre via <JsonLd data={...} /> (cf. components/seo/JsonLd.tsx).
 * Le ProfessionalService global reste dans lib/seo.ts (injecté dans layout).
 */

function absolute(path: string): string {
  return new URL(path, SITE_URL).toString();
}

type Crumb = { name: string; path: string };

/** Fil d'ariane (BreadcrumbList). `path` relatif (ex: "/prix-site-vitrine"). */
export function breadcrumbLd(items: ReadonlyArray<Crumb>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

type QaItem = { question: string; answer: string };

/** Section FAQ (FAQPage). */
export function faqLd(items: ReadonlyArray<QaItem>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Liste d'éléments (page index métiers) : ItemList. */
export function itemListLd(items: ReadonlyArray<Crumb>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absolute(item.path),
    })),
  };
}

type ServiceInput = {
  name: string;
  description: string;
  /** Chemin relatif de la page (ex: "/prix-site-vitrine"). */
  path: string;
  /**
   * Prix de départ optionnel (ex: "490"). Émis en `minPrice` et jamais en
   * `price` : le tarif est un point de départ qui varie selon le périmètre,
   * l'annoncer comme montant ferme serait faux et contredirait le texte
   * visible des pages. Même règle que `professionalServiceLd` (src/lib/seo.ts).
   */
  minPrice?: string;
};

/** Page d'offre/service (Service) rattachée au ProfessionalService Yan-dev. */
export function serviceLd({ name, description, path, minPrice }: ServiceInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    description,
    url: absolute(path),
    // Référence au noeud global du layout plutôt qu'un second
    // ProfessionalService inline : une seule entité dans le graphe.
    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": "Country", name: "France" },
    ...(minPrice
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            url: absolute(path),
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice,
              priceCurrency: "EUR",
            },
          },
        }
      : {}),
  };
}

/**
 * Noeud WebSite du graphe, injecté dans les deux root layouts.
 *
 * Pas de `SearchAction` : le site n'a aucune recherche interne, en déclarer
 * une serait une assertion fausse (cf. SEO.md §5, règle de véracité).
 */
export function websiteLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: HTML_LANG[locale],
    publisher: { "@id": ORGANIZATION_ID },
  };
}
