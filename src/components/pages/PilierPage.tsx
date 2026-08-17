import type { ReactNode } from "react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger } from "@/components/motion/Stagger";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { CtaBlock } from "@/components/seo/CtaBlock";
import { Faq } from "@/components/seo/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Pilier } from "@/content/piliers";
import { breadcrumbLd, faqLd, serviceLd } from "@/lib/jsonld";
import { route } from "@/lib/routes";

/**
 * Page d'intention d'un pilier d'offre (site créatif, produit digital),
 * calquée sur PricingPage. FR uniquement.
 *
 * Pas de `minPrice` dans le `Service` : ces deux offres sont sur devis, et
 * annoncer un montant serait faux (cf. SEO.md §5).
 *
 * La section d'exemples est passée en `children` : chaque pilier illustre avec
 * des objets différents (sites d'un côté, produits de l'autre).
 */

const LOCALE = "fr" as const;

const H2_CLASSES =
  "mt-3 font-serif text-[clamp(1.875rem,2.5vw+1rem,3rem)] font-medium leading-[1.1] tracking-tight text-ink-950";

export function PilierPage({
  pilier,
  children,
}: {
  pilier: Pilier;
  children: ReactNode;
}) {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: pilier.breadcrumbLabel, path: pilier.path },
        ])}
      />
      <JsonLd
        data={serviceLd({
          name: pilier.serviceName,
          description: pilier.metaDescription,
          path: pilier.path,
        })}
      />
      <JsonLd data={faqLd(pilier.faq)} />

      <section className="border-b border-ink-300/40 pb-12 pt-28 md:pb-16 md:pt-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <Breadcrumb
            locale={LOCALE}
            items={[
              { name: "Accueil", href: "/" },
              { name: pilier.breadcrumbLabel },
            ]}
          />
          <FadeIn>
            <h1 className="mt-6 max-w-3xl font-serif text-[clamp(2rem,3.5vw+1rem,3.75rem)] font-medium leading-[1.05] tracking-tight text-ink-950">
              {pilier.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-700">
              {pilier.lead}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <FadeIn>
            <SectionLabel>{pilier.pointsLabel}</SectionLabel>
            <h2 className={H2_CLASSES}>{pilier.pointsTitle}</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-700">
              {pilier.pointsLead}
            </p>
          </FadeIn>

          <Stagger
            className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 lg:gap-8"
            staggerChildren={0.12}
          >
            {pilier.points.map((point) => (
              <FadeIn key={point.title} inside y={24}>
                <div className="h-full rounded-3xl border border-ink-300/60 bg-card p-6 shadow-sm md:p-7">
                  <h3 className="font-serif text-xl font-medium leading-tight text-ink-950">
                    {point.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-ink-700">
                    {point.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-10 lg:px-16">
          <FadeIn>
            <h2 className={H2_CLASSES}>{pilier.compareTitle}</h2>
            {pilier.compareBody.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-5 text-base leading-relaxed text-ink-700"
              >
                {paragraph}
              </p>
            ))}
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <FadeIn>
            <SectionLabel>{pilier.examplesLabel}</SectionLabel>
            <h2 className={H2_CLASSES}>{pilier.examplesTitle}</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-700">
              {pilier.examplesLead}
            </p>
          </FadeIn>
          {children}
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-10 lg:px-16">
          <FadeIn>
            <SectionLabel>{pilier.faqLabel}</SectionLabel>
            <h2 className={H2_CLASSES}>{pilier.faqTitle}</h2>
          </FadeIn>
          <div className="mt-10">
            <Faq items={pilier.faq} />
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <CtaBlock
            title={pilier.ctaTitle}
            text={pilier.ctaText}
            ctaLabel={pilier.ctaLabel}
            ctaHref="/#contact"
            secondaryLabel={pilier.ctaSecondaryLabel}
            secondaryHref={
              pilier.path === "/produit-digital"
                ? "/#travail"
                : route("pricing", LOCALE)
            }
          />
        </div>
      </section>
    </>
  );
}
