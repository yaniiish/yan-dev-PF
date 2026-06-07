import { Button } from "@/components/ui/Button";

type CtaBlockProps = {
  title: string;
  text?: string;
  ctaLabel: string;
  /** Lien du CTA principal. Défaut : ancre contact de la home. */
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

/**
 * Bloc d'appel à l'action réutilisable (fin de page d'intention).
 * Copie passée en props : aucune chaîne en dur (cf. CONTENT.md).
 */
export function CtaBlock({
  title,
  text,
  ctaLabel,
  ctaHref = "/#contact",
  secondaryLabel,
  secondaryHref,
}: CtaBlockProps) {
  return (
    <div className="rounded-3xl border border-ink-300/60 bg-card p-8 text-center shadow-md shadow-ink-950/5 md:p-12">
      <h2 className="font-serif text-[clamp(1.5rem,2vw+1rem,2.25rem)] font-medium leading-tight tracking-tight text-ink-950">
        {title}
      </h2>
      {text ? (
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-500">
          {text}
        </p>
      ) : null}
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button href={ctaHref} size="lg">
          {ctaLabel}
        </Button>
        {secondaryLabel && secondaryHref ? (
          <Button href={secondaryHref} size="lg" variant="secondary">
            {secondaryLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
