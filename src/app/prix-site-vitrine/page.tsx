import type { Metadata } from "next";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger } from "@/components/motion/Stagger";
import { PricingCard } from "@/components/pricing/PricingCard";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { CtaBlock } from "@/components/seo/CtaBlock";
import { Faq } from "@/components/seo/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  PRICING_FOOTNOTE,
  PRICING_PLANS,
  PRIX_PAGE,
  PRIX_PATH,
} from "@/content/pricing";
import { breadcrumbLd, faqLd, serviceLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: PRIX_PAGE.metaTitle,
  description: PRIX_PAGE.metaDescription,
  path: PRIX_PATH,
});

const H2_CLASSES =
  "mt-3 font-serif text-[clamp(1.875rem,2.5vw+1rem,3rem)] font-medium leading-[1.1] tracking-tight text-ink-950";

export default function PrixSiteVitrinePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: PRIX_PAGE.breadcrumbLabel, path: PRIX_PATH },
        ])}
      />
      <JsonLd
        data={serviceLd({
          name: "Création de site vitrine",
          description: PRIX_PAGE.metaDescription,
          path: PRIX_PATH,
          price: "490",
        })}
      />
      <JsonLd data={faqLd(PRIX_PAGE.faq)} />

      <section className="border-b border-ink-300/40 pb-12 pt-28 md:pb-16 md:pt-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <Breadcrumb
            items={[
              { name: "Accueil", href: "/" },
              { name: PRIX_PAGE.breadcrumbLabel },
            ]}
          />
          <FadeIn>
            <h1 className="mt-6 max-w-3xl font-serif text-[clamp(2rem,3.5vw+1rem,3.75rem)] font-medium leading-[1.05] tracking-tight text-ink-950">
              {PRIX_PAGE.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-700">
              {PRIX_PAGE.lead}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <FadeIn>
            <SectionLabel>{PRIX_PAGE.detailLabel}</SectionLabel>
            <h2 className={H2_CLASSES}>{PRIX_PAGE.detailTitle}</h2>
          </FadeIn>

          <Stagger
            className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 md:mt-12 md:grid-cols-3 md:gap-8"
            staggerChildren={0.18}
          >
            {PRICING_PLANS.map((plan) => (
              <FadeIn key={plan.offer} inside x={-32} y={0} duration={0.65}>
                <PricingCard plan={plan} ctaHref="/#contact" />
              </FadeIn>
            ))}
          </Stagger>

          <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-ink-500">
            {PRICING_FOOTNOTE}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-10 lg:px-16">
          <FadeIn>
            <SectionLabel>{PRIX_PAGE.whyLabel}</SectionLabel>
            <h2 className={H2_CLASSES}>{PRIX_PAGE.whyTitle}</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-700">
              {PRIX_PAGE.whyBody}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-10 lg:px-16">
          <FadeIn>
            <SectionLabel>{PRIX_PAGE.faqLabel}</SectionLabel>
            <h2 className={H2_CLASSES}>{PRIX_PAGE.faqTitle}</h2>
          </FadeIn>
          <div className="mt-10">
            <Faq items={PRIX_PAGE.faq} />
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <CtaBlock
            title={PRIX_PAGE.ctaTitle}
            text={PRIX_PAGE.ctaText}
            ctaLabel={PRIX_PAGE.ctaLabel}
            ctaHref="/#contact"
            secondaryLabel={PRIX_PAGE.ctaSecondaryLabel}
            secondaryHref="/#exemples"
          />
        </div>
      </section>
    </>
  );
}
