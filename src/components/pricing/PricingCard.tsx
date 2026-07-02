import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Tooltip } from "@/components/ui/Tooltip";
import type { PricingPlan } from "@/content/pricing";
import { cn } from "@/lib/utils";

/**
 * Carte tarif réutilisable (section Tarifs home + page /prix-site-vitrine).
 * `ctaHref` permet d'adapter la cible du CTA selon la page (#contact sur la
 * home, /#contact depuis une page interne).
 */
export function PricingCard({
  plan,
  ctaHref = "#contact",
}: {
  plan: PricingPlan;
  ctaHref?: string;
}) {
  const {
    badge,
    offer,
    price,
    priceNote,
    recurring,
    recurringNote,
    features,
    ctaLabel,
    highlight,
  } = plan;

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
      {badge ? (
        <span
          className={cn(
            "inline-flex w-fit items-center rounded-full px-3 py-1 font-mono text-[0.7rem] uppercase tracking-widest",
            highlight ? "bg-mint-500 text-ink-950" : "bg-ink-100 text-ink-700",
          )}
        >
          {badge}
        </span>
      ) : null}

      <h3
        className={cn(
          "font-serif text-2xl font-medium leading-tight text-ink-950",
          badge ? "mt-5" : "mt-1",
        )}
      >
        {offer}
      </h3>

      <div className="mt-4">
        <p className="font-serif text-[clamp(2rem,2vw+1rem,2.75rem)] font-medium leading-none text-ink-950">
          {price}
        </p>
        {priceNote ? (
          <p className="mt-1.5 text-xs text-ink-500">{priceNote}</p>
        ) : null}
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
            {features.map((feat) => {
              const label = typeof feat === "string" ? feat : feat.label;
              const tooltip = typeof feat === "string" ? null : feat.tooltip;
              return (
                <li key={label} className="flex items-start gap-2.5">
                  <Check
                    size={18}
                    className="mt-0.5 shrink-0 text-mint-700"
                    aria-hidden="true"
                  />
                  <span
                    className={cn(
                      "text-sm text-ink-700",
                      tooltip && "inline-flex items-center gap-1.5 font-medium text-ink-950",
                    )}
                  >
                    {label}
                    {tooltip ? <Tooltip content={tooltip} label={`À propos de : ${label}`} /> : null}
                  </span>
                </li>
              );
            })}
          </ul>
        </>
      ) : null}

      <div className="mt-auto pt-8">
        <Button
          href={ctaHref}
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
