import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger } from "@/components/motion/Stagger";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { CtaBlock } from "@/components/seo/CtaBlock";
import { ExampleCarousel } from "@/components/seo/ExampleCarousel";
import { Faq } from "@/components/seo/Faq";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  getMetier,
  METIER_LABELS,
  METIERS,
  METIERS_PAGE,
  metierPath,
} from "@/content/metiers";
import { PRIX_PATH } from "@/content/pricing";
import { breadcrumbLd, faqLd, serviceLd } from "@/lib/jsonld";
import { buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ metier: string }> };

// Seuls les métiers connus sont générés ; tout autre slug renvoie un 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return METIERS.map((metier) => ({ metier: metier.slug }));
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { metier: slug } = await params;
  const metier = getMetier(slug);
  if (!metier) return {};
  return buildMetadata({
    title: metier.metaTitle,
    description: metier.metaDescription,
    path: metierPath(slug),
  });
}

const H2_CLASSES =
  "mt-3 font-serif text-[clamp(1.875rem,2.5vw+1rem,3rem)] font-medium leading-[1.1] tracking-tight text-ink-950";

export default async function MetierPage({ params }: Params) {
  const { metier: slug } = await params;
  const metier = getMetier(slug);
  if (!metier) notFound();

  const path = metierPath(slug);
  const related = METIERS.filter((item) => item.slug !== slug);

  const relatedLinks = [
    {
      label: METIER_LABELS.relatedPricingLabel,
      href: PRIX_PATH,
      description: METIER_LABELS.relatedPricingDesc,
    },
    {
      label: METIERS_PAGE.navLabel,
      href: METIERS_PAGE.path,
      description: METIERS_PAGE.breadcrumbLabel,
    },
    ...related.map((item) => ({
      label: item.navLabel,
      href: metierPath(item.slug),
      description: item.breadcrumbLabel,
    })),
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: METIERS_PAGE.breadcrumbLabel, path: METIERS_PAGE.path },
          { name: metier.breadcrumbLabel, path },
        ])}
      />
      <JsonLd
        data={serviceLd({
          name: metier.serviceName,
          description: metier.metaDescription,
          path,
          price: "490",
        })}
      />
      <JsonLd data={faqLd(metier.faq)} />

      <section className="border-b border-ink-300/40 pb-12 pt-28 md:pb-16 md:pt-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <Breadcrumb
            items={[
              { name: "Accueil", href: "/" },
              { name: METIERS_PAGE.breadcrumbLabel, href: METIERS_PAGE.path },
              { name: metier.breadcrumbLabel },
            ]}
          />
          <FadeIn>
            <h1 className="mt-6 max-w-3xl font-serif text-[clamp(2rem,3.5vw+1rem,3.75rem)] font-medium leading-[1.05] tracking-tight text-ink-950">
              {metier.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-700">
              {metier.lead}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <FadeIn>
            <SectionLabel>{METIER_LABELS.enjeux}</SectionLabel>
            <h2 className={H2_CLASSES}>{metier.enjeuxTitle}</h2>
          </FadeIn>

          <Stagger
            className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 lg:gap-8"
            staggerChildren={0.12}
          >
            {metier.enjeux.map((enjeu) => (
              <FadeIn key={enjeu.title} inside y={24}>
                <article className="h-full rounded-2xl border border-ink-300/60 bg-card p-6 shadow-sm md:p-8">
                  <h3 className="font-serif text-xl font-medium leading-tight text-ink-950">
                    {enjeu.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-ink-700">
                    {enjeu.body}
                  </p>
                </article>
              </FadeIn>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <FadeIn>
            <SectionLabel>{METIER_LABELS.example}</SectionLabel>
            <h2 className={H2_CLASSES}>
              {metier.examples.length > 1
                ? METIER_LABELS.exampleTitlePlural
                : METIER_LABELS.exampleTitle}
            </h2>
          </FadeIn>
          <FadeIn y={24} className="mt-10">
            {metier.examples.length > 1 ? (
              <ExampleCarousel
                examples={metier.examples}
                ctaLabel={METIER_LABELS.exampleCta}
              />
            ) : (
              <div className="overflow-hidden rounded-3xl border border-ink-300/60 bg-card shadow-md shadow-ink-950/5">
                <div className="relative aspect-[16/9] w-full border-b border-ink-300/60">
                  <Image
                    src={metier.examples[0].image.src}
                    alt={metier.examples[0].image.alt}
                    width={metier.examples[0].image.width}
                    height={metier.examples[0].image.height}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 1024px"
                    priority
                    className="absolute inset-0 size-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-3 p-5 sm:p-6 md:p-7">
                  <p className="text-sm text-ink-500 sm:text-base">
                    {metier.examples[0].description}
                  </p>
                  <a
                    href={metier.examples[0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-2 text-sm font-medium text-mint-700 underline decoration-mint-500 decoration-2 underline-offset-4 transition-colors duration-200 hover:text-mint-900 hover:decoration-mint-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700"
                  >
                    {METIER_LABELS.exampleCta}
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>
            )}
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <FadeIn>
            <div className="flex flex-col items-center gap-5 rounded-3xl border border-mint-500/40 bg-accent-soft p-8 text-center md:p-10">
              <SectionLabel>{METIER_LABELS.pricing}</SectionLabel>
              <p className="font-serif text-[clamp(1.5rem,2vw+1rem,2.25rem)] font-medium leading-tight tracking-tight text-ink-950">
                {METIER_LABELS.pricingCallout}
              </p>
              <Button href={PRIX_PATH} variant="secondary" size="lg">
                {METIER_LABELS.pricingCta}
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-10 lg:px-16">
          <FadeIn>
            <SectionLabel>{METIER_LABELS.faq}</SectionLabel>
            <h2 className={H2_CLASSES}>{METIER_LABELS.faqTitle}</h2>
          </FadeIn>
          <div className="mt-10">
            <Faq items={metier.faq} />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <RelatedLinks title={METIER_LABELS.related} links={relatedLinks} />
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <CtaBlock
            title={metier.ctaTitle}
            text={metier.ctaText}
            ctaLabel={METIER_LABELS.ctaPrimary}
            ctaHref="/#contact"
            secondaryLabel={METIER_LABELS.ctaSecondary}
            secondaryHref={PRIX_PATH}
          />
        </div>
      </section>
    </>
  );
}
