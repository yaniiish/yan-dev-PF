import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger } from "@/components/motion/Stagger";
import { PricingCard } from "@/components/pricing/PricingCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  PRICING_FOOTNOTE,
  PRICING_PLANS,
  PRICING_SECTION,
} from "@/content/pricing";

export function Pricing() {
  return (
    <section id="tarifs" className="bg-ink-50 py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <FadeIn>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
            <div className="max-w-3xl">
              <SectionLabel>Tarifs</SectionLabel>
              <h2 className="mt-3 font-serif text-[clamp(1.875rem,2.5vw+1rem,3rem)] font-medium leading-[1.1] tracking-tight text-ink-950">
                {PRICING_SECTION.h2}
              </h2>
            </div>
            <p className="max-w-md text-base leading-relaxed text-ink-500">
              {PRICING_SECTION.lead}
            </p>
          </div>
        </FadeIn>

        <Stagger
          className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 md:gap-8"
          staggerChildren={0.18}
        >
          {PRICING_PLANS.map((plan) => (
            <FadeIn key={plan.offer} inside x={-32} y={0} duration={0.65}>
              <PricingCard plan={plan} />
            </FadeIn>
          ))}
        </Stagger>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-ink-500">
          {PRICING_FOOTNOTE}
        </p>
      </div>
    </section>
  );
}
