import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger } from "@/components/motion/Stagger";
import { PricingCard } from "@/components/pricing/PricingCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Locale } from "@/content/locales";
import {
  PILIER_CREATIF,
  PILIER_PRODUIT,
  type Pilier,
} from "@/content/piliers";
import { pricingContent } from "@/content/pricing";
import { route } from "@/lib/routes";

/**
 * Seul aplat sombre du site. Il sert de coupure : la section précédente et la
 * suivante sont claires, donc le changement de sujet se voit sans filet ni
 * séparateur. Les cartes restent claires par-dessus (cf. DESIGN_SYSTEM §6.1).
 */
/**
 * Pilier correspondant à chaque carte tarif, dans l'ordre des trois offres
 * (site vitrine, site créatif, produit digital). La première n'en a pas :
 * elle pointe déjà vers /prix-site-vitrine via `section.pageLinkLabel`.
 */
const PILIER_BY_PLAN_INDEX: readonly (Pilier | undefined)[] = [
  undefined,
  PILIER_CREATIF,
  PILIER_PRODUIT,
];

export function Pricing({ locale }: { locale: Locale }) {
  const { plans, section } = pricingContent(locale);
  const pricingPath = route("pricing", locale);

  return (
    <section id="tarifs" className="bg-ink-950 py-20 md:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <FadeIn>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
            <div className="max-w-3xl">
              <SectionLabel className="text-mint-500">{section.label}</SectionLabel>
              <h2 className="mt-3 font-serif text-[clamp(1.875rem,2.5vw+1rem,3rem)] font-medium leading-[1.1] tracking-tight text-ink-50">
                {section.h2}
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-ink-300">
              {section.lead}
            </p>
          </div>
        </FadeIn>

        {/* Deux colonnes et non trois : l'offre qui porte l'encart est deux
            fois plus haute que les deux offres sur devis. Elle occupe donc
            une colonne entière et les deux autres s'empilent en face, ce qui
            évite un vide d'environ 490px sous la rangée. */}
        <Stagger
          className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:mt-16 lg:grid-cols-2 lg:items-start lg:gap-8"
          staggerChildren={0.18}
        >
          {plans.map((plan, index) => (
            <FadeIn
              key={plan.offer}
              className={plan.addon ? "lg:row-span-2" : undefined}
              inside
              x={-32}
              y={0}
              duration={0.65}
            >
              <PricingCard plan={plan} locale={locale} />

              {/* Le lien vit sous la carte Site vitrine, pas sous la grille :
                  il pointe vers le prix d'un site vitrine, et il occupe le
                  reliquat de hauteur de cette colonne. */}
              {plan.addon ? (
                <div className="mt-6 text-center">
                  <a
                    href={pricingPath}
                    className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold tracking-tight text-mint-500 transition-colors hover:text-mint-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-500"
                  >
                    {section.pageLinkLabel}
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              ) : null}

              {/* Même maillage pour les deux autres piliers. Les pages
                  correspondantes n'existent qu'en français, donc pas de lien
                  depuis la version anglaise de la section. L'index suit
                  l'ordre des trois offres (cf. CONTENT.md §6). */}
              {locale === "fr" && PILIER_BY_PLAN_INDEX[index] ? (
                <div className="mt-6 text-center">
                  <a
                    href={PILIER_BY_PLAN_INDEX[index].path}
                    className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold tracking-tight text-mint-500 transition-colors hover:text-mint-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-500"
                  >
                    {PILIER_BY_PLAN_INDEX[index].sectionLinkLabel}
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </div>
              ) : null}
            </FadeIn>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
