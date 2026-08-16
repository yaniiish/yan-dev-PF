import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Tooltip } from "@/components/ui/Tooltip";
import { FEATURES_LABEL, type PricingFeature, type PricingPlan } from "@/content/pricing";

/**
 * Carte tarif réutilisable (section Tarifs home + page /prix-site-vitrine).
 * `ctaHref` permet d'adapter la cible du CTA selon la page (#contact sur la
 * home, /#contact depuis une page interne).
 *
 * Les cartes ne sont pas mises à la même hauteur : depuis que la première
 * porte l'encart d'abonnement, l'égalisation creusait 300px de vide dans les
 * deux autres. Elles sont donc calées en haut, à leur hauteur naturelle.
 */
export function PricingCard({
  plan,
  ctaHref = "#contact",
}: {
  plan: PricingPlan;
  ctaHref?: string;
}) {
  const {
    offer,
    price,
    priceTooltip,
    pitch,
    features,
    addon,
    note,
    noteEmphasis,
    ctaLabel,
  } = plan;

  return (
    <article className="flex h-full flex-col rounded-3xl border border-ink-300/60 bg-card p-7 shadow-md shadow-ink-950/5 transition duration-300 ease-out hover:-translate-y-1 hover:border-ink-300 hover:shadow-xl hover:shadow-ink-950/10 md:p-8">
      <h3 className="font-serif text-2xl font-medium leading-tight text-ink-950">
        {offer}
      </h3>

      <div className="mt-4 flex items-center gap-2">
        <p className="font-serif text-[clamp(1.75rem,1.2vw+1rem,2.25rem)] font-medium leading-tight text-ink-950">
          {price}
        </p>
        {priceTooltip ? (
          <Tooltip
            content={priceTooltip}
            label={`À propos du tarif : ${offer}`}
            align="end"
          />
        ) : null}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-ink-500">{pitch}</p>

      <p className="mt-7 font-mono text-xs uppercase tracking-widest text-ink-700">
        {FEATURES_LABEL}
      </p>
      <ul className="mt-3.5 flex flex-col gap-2.5">
        {features.map((feature) => (
          <FeatureItem key={featureLabel(feature)} feature={feature} />
        ))}
      </ul>

      {addon ? (
        <div className="mt-7 rounded-2xl border border-mint-500/40 bg-mint-50/50 p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <p className="font-serif text-lg font-medium leading-tight text-ink-950">
              {addon.title}
            </p>
            <p className="font-sans text-base font-semibold tracking-tight text-mint-900">
              {addon.price}
            </p>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink-700">
            {addon.intro}
          </p>
          {/* Puces plutôt que des coches : la liste principale garde ses
              coches, l'encart reste secondaire et la carte plus légère. */}
          <ul className="mt-3 flex flex-col gap-1.5">
            {addon.items.map((item) => (
              <li
                key={featureLabel(item)}
                className="flex items-start gap-2.5 text-sm text-ink-700"
              >
                <span
                  className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-mint-700"
                  aria-hidden="true"
                />
                <span className="inline-flex items-center gap-1.5">
                  {featureLabel(item)}
                  {typeof item === "string" ? null : (
                    <Tooltip
                      content={item.tooltip}
                      label={`À propos de : ${item.label}`}
                      align="end"
                    />
                  )}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-3.5 text-sm font-semibold text-ink-950">
            {addon.note}
          </p>
        </div>
      ) : null}

      {note ? (
        <p className="mt-6 text-sm leading-relaxed text-ink-500">
          <Emphasised text={note} emphasis={noteEmphasis} />
        </p>
      ) : null}

      <div className="mt-auto pt-8">
        <Button href={ctaHref} size="lg" variant="primary" className="w-full">
          {ctaLabel}
        </Button>
      </div>
    </article>
  );
}

function FeatureItem({ feature }: { feature: PricingFeature }) {
  const label = featureLabel(feature);
  return (
    <li className="flex items-start gap-2.5">
      <Check size={18} className="mt-0.5 shrink-0 text-mint-700" aria-hidden="true" />
      <span className="inline-flex items-center gap-1.5 text-sm text-ink-700">
        {label}
        {typeof feature === "string" ? null : (
          <Tooltip
            content={feature.tooltip}
            label={`À propos de : ${label}`}
            align="end"
          />
        )}
      </span>
    </li>
  );
}

function featureLabel(feature: PricingFeature): string {
  return typeof feature === "string" ? feature : feature.label;
}

/** Met en gras un fragment sans stocker de balisage dans le contenu. */
function Emphasised({ text, emphasis }: { text: string; emphasis?: string }) {
  if (!emphasis) return <>{text}</>;

  const at = text.indexOf(emphasis);
  if (at === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, at)}
      <strong className="font-semibold text-ink-950">{emphasis}</strong>
      {text.slice(at + emphasis.length)}
    </>
  );
}
