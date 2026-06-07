/**
 * Injecte un bloc JSON-LD dans le DOM. Données générées par les builders
 * de lib/jsonld.ts (breadcrumbLd, faqLd, serviceLd).
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
