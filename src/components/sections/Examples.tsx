import { BGPattern } from "@/components/backgrounds/BGPattern";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger } from "@/components/motion/Stagger";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

const H2 = "Deux styles, une même exigence.";

const LEAD =
  "Selon votre besoin, je peux livrer un site clair et efficace pour votre commerce, ou pousser le curseur design pour les projets plus ambitieux.";

type Example = {
  badge: string;
  title: string;
  body: string;
  audience: string;
  tone: "light" | "dark";
};

const EXAMPLES: readonly Example[] = [
  {
    badge: "Classique",
    title: "Site clair et efficace",
    body: "Sobre, lisible, rapide. Mis en ligne rapidement.",
    audience: "Boulangerie · Artisan · Restaurant",
    tone: "light",
  },
  {
    badge: "Premium",
    title: "Site sur mesure",
    body: "Animations soignées, identité forte, expérience travaillée.",
    audience: "TPE · Cabinet · Marque",
    tone: "dark",
  },
] as const;

export function Examples() {
  return (
    <section id="exemples" className="bg-card py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <FadeIn>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
            <div className="max-w-3xl">
              <SectionLabel>Exemples</SectionLabel>
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
          className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2 md:gap-8"
          staggerChildren={0.18}
        >
          {EXAMPLES.map((example) => (
            <FadeIn key={example.badge} inside x={-32} y={0} duration={0.65}>
              <article
                className={cn(
                  "group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-300/60 bg-card",
                  "shadow-md shadow-ink-950/5",
                  "transition duration-300 ease-out",
                  "hover:-translate-y-1 hover:border-mint-500/40 hover:shadow-xl hover:shadow-ink-950/10",
                )}
              >
                <Visual tone={example.tone} />
                <div className="flex flex-col gap-3 p-5 md:p-6">
                  <span
                    className={cn(
                      "inline-flex w-fit items-center rounded-full px-3 py-1 font-mono text-[0.7rem] uppercase tracking-widest",
                      example.tone === "light"
                        ? "bg-mint-50 text-mint-700"
                        : "bg-ink-950 text-mint-100",
                    )}
                  >
                    {example.badge}
                  </span>
                  <h3 className="font-serif text-xl font-medium leading-tight text-ink-950 md:text-2xl">
                    {example.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-700">
                    {example.body}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-widest text-ink-500">
                    {example.audience}
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
        </Stagger>

        <p className="mt-8 text-center text-xs text-ink-500">
          Visuels placeholders — projets réels à venir.
        </p>
      </div>
    </section>
  );
}

function Visual({ tone }: { tone: "light" | "dark" }) {
  if (tone === "light") {
    return (
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-mint-50 via-ink-50 to-ink-100">
        <BGPattern variant="grid" mask="fade-edges" />
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-ink-950 via-ink-700 to-ink-950">
      <BGPattern
        variant="grid"
        mask="fade-edges"
        fill="color-mix(in oklch, var(--color-mint-500) 25%, transparent)"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_color-mix(in_oklch,var(--color-mint-500)_15%,transparent)_0%,_transparent_60%)]"
      />
    </div>
  );
}
