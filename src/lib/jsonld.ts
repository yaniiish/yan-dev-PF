import { SITE_NAME } from "@/content/site";
import { SITE_URL } from "@/lib/seo";

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

type ServiceInput = {
  name: string;
  description: string;
  /** Chemin relatif de la page (ex: "/prix-site-vitrine"). */
  path: string;
  /** Prix de départ optionnel (ex: "490"). */
  price?: string;
};

/** Page d'offre/service (Service) rattachée au ProfessionalService Yan-dev. */
export function serviceLd({ name, description, path, price }: ServiceInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: name,
    description,
    url: absolute(path),
    provider: {
      "@type": "ProfessionalService",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: { "@type": "Country", name: "France" },
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            price,
            priceCurrency: "EUR",
            url: absolute(path),
          },
        }
      : {}),
  };
}
