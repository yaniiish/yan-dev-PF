import type { Metadata } from "next";
import { FadeIn } from "@/components/motion/FadeIn";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { LEGAL } from "@/content/legal";
import { CONTACT_EMAIL } from "@/content/site";
import { breadcrumbLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

// Page FR uniquement : aucune contrepartie anglaise, donc pas de `routeKey`
// et aucun hreflang (cf. src/lib/seo.ts et SEO.md §7).
const LOCALE = "fr" as const;

// Page laissée indexable à dessein : elle identifie l'entité (SIRET, forme
// juridique, contact), ce qui est un signal de confiance pour Google comme
// pour les moteurs de réponse (cf. SEO.md §3, citabilité GEO). La passer en
// `noindex` contredirait sa présence au sitemap.
export const metadata: Metadata = buildMetadata({
  locale: LOCALE,
  title: LEGAL.metaTitle,
  description: LEGAL.metaDescription,
  path: LEGAL.path,
});

export default function MentionsLegalesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: LEGAL.breadcrumbLabel, path: LEGAL.path },
        ])}
      />

      <section className="border-b border-ink-300/40 pb-12 pt-28 md:pb-16 md:pt-36">
        <div className="mx-auto max-w-3xl px-6 md:px-10 lg:px-16">
          <Breadcrumb
            locale={LOCALE}
            items={[
              { name: "Accueil", href: "/" },
              { name: LEGAL.breadcrumbLabel },
            ]}
          />
          <FadeIn>
            <h1 className="mt-6 font-serif text-[clamp(2rem,3.5vw+1rem,3.75rem)] font-medium leading-[1.05] tracking-tight text-ink-950">
              {LEGAL.h1}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-700">
              {LEGAL.lead}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto flex max-w-3xl flex-col gap-12 px-6 md:px-10 lg:px-16">
          {LEGAL.sections.map((section) => (
            <FadeIn key={section.id}>
              <h2 className="font-serif text-[clamp(1.375rem,1.5vw+1rem,1.875rem)] font-medium leading-tight tracking-tight text-ink-950">
                {section.title}
              </h2>

              {section.rows.length > 0 ? (
                <dl className="mt-5 flex flex-col gap-3 border-l-2 border-mint-500/40 pl-5">
                  {section.rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex flex-col gap-1 sm:flex-row sm:gap-3"
                    >
                      <dt className="font-mono text-xs uppercase tracking-widest text-ink-500 sm:w-40 sm:shrink-0 sm:pt-1">
                        {row.label}
                      </dt>
                      <dd className="text-base leading-relaxed text-ink-700">
                        {row.value === CONTACT_EMAIL ? (
                          <a
                            href={`mailto:${CONTACT_EMAIL}`}
                            className="break-words text-ink-950 underline decoration-mint-500 decoration-2 underline-offset-4 transition-colors hover:text-mint-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700"
                          >
                            {row.value}
                          </a>
                        ) : (
                          row.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              {section.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-4 text-base leading-relaxed text-ink-700"
                >
                  {paragraph}
                </p>
              ))}
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
