import { Check } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger } from "@/components/motion/Stagger";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

const H2 = "Des tarifs clairs, sans devis à rallonge.";

const LEAD =
  "Le prix annoncé est le prix payé. Si votre projet sort du cadre, on en parle et on adapte ensemble.";

const FOOTNOTE =
  "Pas de frais cachés. Pas d'engagement long terme sur la maintenance — résiliable à tout moment avec un préavis d'un mois.";

const VITRINE_FEATURES = [
  "Site one-page sur mesure",
  "Responsive mobile, tablette, desktop",
  "SEO local de base",
  "Formulaire de contact",
  "Mise en ligne sous 2 à 3 semaines",
] as const;

const PREMIUM_DESCRIPTION =
  "Animations avancées, design poussé, plusieurs pages, intégrations spécifiques (réservation, boutique simple…). On échange, je vous fais une proposition adaptée.";

export function Pricing() {
  return (
    <section id="tarifs" className="bg-ink-50 py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <FadeIn>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
            <div className="max-w-3xl">
              <SectionLabel number="05">Tarifs</SectionLabel>
              <h2 className="mt-3 font-serif text-[clamp(1.875rem,2.5vw+1rem,3rem)] font-medium leading-[1.1] tracking-tight text-ink-950">
                {H2}
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-ink-500">
              {LEAD}
            </p>
          </div>
        </FadeIn>

        <Stagger
          className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 md:gap-8"
          staggerChildren={0.18}
        >
          <FadeIn inside x={-32} y={0} duration={0.65}>
            <PricingCard
              badge="Le plus demandé"
              highlight
              offer="Site vitrine"
              price="490 €"
              priceNote="paiement unique à la livraison"
              recurring="+ 30 €/mois"
              recurringNote="hébergement, mises à jour et modifications mineures"
              features={VITRINE_FEATURES}
              ctaLabel="Démarrer mon projet"
            />
          </FadeIn>
          <FadeIn inside x={-32} y={0} duration={0.65}>
            <PricingCard
              badge="Sur mesure"
              offer="Site premium"
              price="Sur devis"
              priceNote="selon ambition et fonctionnalités"
              description={PREMIUM_DESCRIPTION}
              ctaLabel="Parlons de votre projet"
            />
          </FadeIn>
        </Stagger>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-ink-500">
          {FOOTNOTE}
        </p>
      </div>
    </section>
  );
}

type PricingCardProps = {
  badge: string;
  offer: string;
  price: string;
  priceNote: string;
  recurring?: string;
  recurringNote?: string;
  features?: readonly string[];
  description?: string;
  ctaLabel: string;
  highlight?: boolean;
};

function PricingCard({
  badge,
  offer,
  price,
  priceNote,
  recurring,
  recurringNote,
  features,
  description,
  ctaLabel,
  highlight,
}: PricingCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-3xl bg-card p-7 md:p-9",
        "transition duration-300 ease-out",
        highlight
          ? "border-2 border-mint-500 shadow-xl shadow-mint-500/10"
          : "border border-ink-300/60 shadow-md shadow-ink-950/5",
      )}
    >
      <span
        className={cn(
          "inline-flex w-fit items-center rounded-full px-3 py-1 font-mono text-[0.7rem] uppercase tracking-widest",
          highlight ? "bg-mint-500 text-ink-950" : "bg-ink-100 text-ink-700",
        )}
      >
        {badge}
      </span>

      <h3 className="mt-5 font-serif text-2xl font-medium leading-tight text-ink-950">
        {offer}
      </h3>

      <div className="mt-4">
        <p className="font-serif text-[clamp(2rem,2vw+1rem,2.75rem)] font-medium leading-none text-ink-950">
          {price}
        </p>
        <p className="mt-1.5 text-xs text-ink-500">{priceNote}</p>
      </div>

      {recurring ? (
        <div className="mt-4">
          <p className="font-serif text-xl font-medium leading-none text-ink-950">
            {recurring}
          </p>
          <p className="mt-1.5 text-xs text-ink-500">{recurringNote}</p>
        </div>
      ) : null}

      {features ? (
        <>
          <hr className="my-6 border-ink-300/60" />
          <ul className="flex flex-col gap-2.5">
            {features.map((feat) => (
              <li key={feat} className="flex items-start gap-2.5">
                <Check
                  size={18}
                  className="mt-0.5 shrink-0 text-mint-700"
                  aria-hidden="true"
                />
                <span className="text-sm text-ink-700">{feat}</span>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {description ? (
        <>
          <hr className="my-6 border-ink-300/60" />
          <p className="text-sm leading-relaxed text-ink-700">{description}</p>
        </>
      ) : null}

      <div className="mt-auto pt-8">
        <Button
          href="#contact"
          size="lg"
          variant={highlight ? "primary" : "secondary"}
          className="w-full"
        >
          {ctaLabel}
        </Button>
      </div>
    </article>
  );
}
