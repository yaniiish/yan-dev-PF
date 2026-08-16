import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Locale } from "@/content/locales";
import { METIERS_BASE } from "@/content/metiers";
import { products, travailContent, websites } from "@/content/travail";
import { WorkShowcase, type ShowcaseItem } from "./WorkShowcase";

// Les deux colonnes partagent la même vitrine : la catégorie du site et la
// nature du produit occupent la même place, le secteur et la description aussi.
function websiteItems(locale: Locale): readonly ShowcaseItem[] {
  return websites(locale).map((site) => ({
    id: site.id,
    title: site.title,
    kicker: site.category,
    meta: site.sector,
    href: site.href,
    image: site.image,
  }));
}

function productItems(locale: Locale): readonly ShowcaseItem[] {
  return products(locale).map((product) => ({
    id: product.id,
    title: product.title,
    kicker: product.kind,
    meta: product.description,
    href: product.href,
    badge: { label: product.statusLabel, live: product.status === "live" },
    image: product.image,
  }));
}

export function Travail({ locale }: { locale: Locale }) {
  const content = travailContent(locale);

  return (
    <section id="travail" className="bg-card py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>{content.label}</SectionLabel>
            <h2 className="mt-3 font-serif text-[clamp(1.875rem,2.5vw+1rem,3rem)] font-medium leading-[1.1] tracking-tight text-ink-950">
              {content.h2}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink-500">
              {content.lead}
            </p>
          </div>
        </FadeIn>

        {/* Deux colonnes separees par un filet vertical a partir de lg.
            En dessous, elles s'empilent et le filet devient horizontal. */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-0">
          <FadeIn y={24} className="lg:col-span-7 lg:pr-10 xl:pr-14">
            <ColumnTitle>{content.columnWebsites}</ColumnTitle>
            <div className="mt-6">
              <WorkShowcase
                locale={locale}
                items={websiteItems(locale)}
                itemNoun={content.websiteNoun}
                thumbsClassName="grid-cols-3 sm:grid-cols-6"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
            {/* Le lien vers les exemples par métier n'existe qu'en français :
                ces pages ciblent le SEO local et n'ont pas d'équivalent EN. */}
            {locale === "fr" ? (
              <div className="mt-8">
                <Button href={METIERS_BASE} variant="secondary" size="md">
                  {content.metiersLinkLabel}
                  <ArrowRight size={18} aria-hidden="true" />
                </Button>
              </div>
            ) : null}
          </FadeIn>

          <FadeIn
            y={24}
            className="border-t border-ink-300/60 pt-12 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0 xl:pl-14"
          >
            <ColumnTitle>{content.columnProducts}</ColumnTitle>
            <div className="mt-6">
              <WorkShowcase
                locale={locale}
                items={productItems(locale)}
                itemNoun={content.productNoun}
                thumbsClassName="grid-cols-2"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-mono text-sm uppercase tracking-widest text-ink-950">
      {children}
      <span className="mt-2 block h-px w-12 bg-mint-500" aria-hidden="true" />
    </h3>
  );
}
