import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger } from "@/components/motion/Stagger";
import { PricingCard } from "@/components/pricing/PricingCard";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { CtaBlock } from "@/components/seo/CtaBlock";
import { Faq } from "@/components/seo/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Locale } from "@/content/locales";
import { pricingContent } from "@/content/pricing";
import { breadcrumbLd, faqLd, serviceLd } from "@/lib/jsonld";
import { anchorHref, homePath, route } from "@/lib/routes";

/**
 * Page d'intention tarifs, partagée par `/prix-site-vitrine` (FR) et
 * `/en/pricing` (EN). Seul le contenu change : la structure, le maillage
 * interne et les données structurées sont identiques.
 */

const H2_CLASSES =
  "mt-3 font-serif text-[clamp(1.875rem,2.5vw+1rem,3rem)] font-medium leading-[1.1] tracking-tight text-ink-950";

export function PricingPage({ locale }: { locale: Locale }) {
  const { plans, page } = pricingContent(locale);
  const path = route("pricing", locale);
  const home = homePath(locale);
  const contactHref = anchorHref("#contact", locale, false);
  const workHref = anchorHref("#travail", locale, false);

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: page.breadcrumbHome, path: home },
          { name: page.breadcrumbLabel, path },
        ])}
      />
      <JsonLd
        data={serviceLd({
          name: page.serviceName,
          description: page.metaDescription,
          path,
          minPrice: "490",
        })}
      />
      <JsonLd data={faqLd(page.faq)} />

      <section className="border-b border-ink-300/40 pb-12 pt-28 md:pb-16 md:pt-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <Breadcrumb
            locale={locale}
            items={[
              { name: page.breadcrumbHome, href: home },
              { name: page.breadcrumbLabel },
            ]}
          />
          <FadeIn>
            <h1 className="mt-6 max-w-3xl font-serif text-[clamp(2rem,3.5vw+1rem,3.75rem)] font-medium leading-[1.05] tracking-tight text-ink-950">
              {page.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-700">
              {page.lead}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <FadeIn>
            <SectionLabel>{page.detailLabel}</SectionLabel>
            <h2 className={H2_CLASSES}>{page.detailTitle}</h2>
          </FadeIn>

          <Stagger
            className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:mt-12 lg:grid-cols-2 lg:items-start lg:gap-8"
            staggerChildren={0.18}
          >
            {plans.map((plan) => (
              <FadeIn
                key={plan.offer}
                className={plan.addon ? "lg:row-span-2" : undefined}
                inside
                x={-32}
                y={0}
                duration={0.65}
              >
                <PricingCard
                  plan={plan}
                  locale={locale}
                  ctaHref={contactHref}
                />
              </FadeIn>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-10 lg:px-16">
          <FadeIn>
            <SectionLabel>{page.whyLabel}</SectionLabel>
            <h2 className={H2_CLASSES}>{page.whyTitle}</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-700">
              {page.whyBody}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-10 lg:px-16">
          <FadeIn>
            <SectionLabel>{page.faqLabel}</SectionLabel>
            <h2 className={H2_CLASSES}>{page.faqTitle}</h2>
          </FadeIn>
          <div className="mt-10">
            <Faq items={page.faq} />
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <CtaBlock
            title={page.ctaTitle}
            text={page.ctaText}
            ctaLabel={page.ctaLabel}
            ctaHref={contactHref}
            secondaryLabel={page.ctaSecondaryLabel}
            secondaryHref={workHref}
          />
        </div>
      </section>
    </>
  );
}
