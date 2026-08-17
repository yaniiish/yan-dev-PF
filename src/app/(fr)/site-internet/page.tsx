import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger } from "@/components/motion/Stagger";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { METIERS, METIERS_PAGE, metierPath } from "@/content/metiers";
import { breadcrumbLd, itemListLd, serviceLd } from "@/lib/jsonld";
import { route } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

// Pages FR uniquement : elles ciblent le SEO local et n'ont pas de version EN.
const LOCALE = "fr" as const;
const PRIX_PATH_FR = route("pricing", LOCALE);

export const metadata: Metadata = buildMetadata({
  locale: LOCALE,
  title: METIERS_PAGE.metaTitle,
  description: METIERS_PAGE.metaDescription,
  path: METIERS_PAGE.path,
});

const H2_CLASSES =
  "mt-3 font-serif text-[clamp(1.875rem,2.5vw+1rem,3rem)] font-medium leading-[1.1] tracking-tight text-ink-950";

export default function MetiersIndexPage() {
  const metierItems = METIERS.map((metier) => ({
    name: metier.breadcrumbLabel,
    path: metierPath(metier.slug),
  }));

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Accueil", path: "/" },
          { name: METIERS_PAGE.breadcrumbLabel, path: METIERS_PAGE.path },
        ])}
      />
      <JsonLd
        data={serviceLd({
          name: "Création de site internet",
          description: METIERS_PAGE.metaDescription,
          path: METIERS_PAGE.path,
          minPrice: "490",
        })}
      />
      <JsonLd data={itemListLd(metierItems)} />

      <section className="border-b border-ink-300/40 pb-12 pt-28 md:pb-16 md:pt-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <Breadcrumb
            locale={LOCALE}
            items={[
              { name: "Accueil", href: "/" },
              { name: METIERS_PAGE.breadcrumbLabel },
            ]}
          />
          <FadeIn>
            <h1 className="mt-6 max-w-3xl font-serif text-[clamp(2rem,3.5vw+1rem,3.75rem)] font-medium leading-[1.05] tracking-tight text-ink-950">
              {METIERS_PAGE.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-700">
              {METIERS_PAGE.lead}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
          <FadeIn>
            <SectionLabel>{METIERS_PAGE.gridLabel}</SectionLabel>
            <h2 className={H2_CLASSES}>{METIERS_PAGE.gridTitle}</h2>
          </FadeIn>

          <Stagger
            className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            staggerChildren={0.12}
          >
            {METIERS.map((metier, index) => (
              <FadeIn key={metier.slug} inside y={24}>
                <a
                  href={metierPath(metier.slug)}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-300/60 bg-card shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:border-mint-500/40 hover:shadow-xl hover:shadow-ink-950/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-ink-300/60">
                    <Image
                      src={metier.examples[0].image.src}
                      alt={metier.examples[0].image.alt}
                      width={metier.examples[0].image.width}
                      height={metier.examples[0].image.height}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                      priority={index === 0}
                      className="absolute inset-0 size-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 items-center justify-between gap-3 p-5 md:p-6">
                    <span className="min-w-0">
                      <span className="block font-serif text-xl font-medium leading-tight text-ink-950">
                        {metier.navLabel}
                      </span>
                      <span className="mt-1 block text-sm text-ink-500">
                        {metier.breadcrumbLabel}
                      </span>
                    </span>
                    <ArrowRight
                      size={18}
                      aria-hidden="true"
                      className="shrink-0 text-mint-700 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                    />
                  </div>
                </a>
              </FadeIn>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl px-6 md:px-10 lg:px-16">
          <FadeIn>
            <div className="rounded-3xl border border-mint-500/40 bg-accent-soft p-8 text-center md:p-12">
              <h2 className="font-serif text-[clamp(1.5rem,2vw+1rem,2.25rem)] font-medium leading-tight tracking-tight text-ink-950">
                {METIERS_PAGE.allTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-700">
                {METIERS_PAGE.allText}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/#contact" size="lg">
                  {METIERS_PAGE.allCtaLabel}
                </Button>
                <Button href={PRIX_PATH_FR} size="lg" variant="secondary">
                  {METIERS_PAGE.allCtaSecondaryLabel}
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
