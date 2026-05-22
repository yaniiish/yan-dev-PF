import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger } from "@/components/motion/Stagger";
import { Card } from "@/components/ui/Card";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

const H2 = "Pas de site, c'est des clients qui passent à côté.";

const LEAD =
  "Aujourd'hui, tout le monde cherche sur Google avant de pousser la porte. Sans site clair, vous êtes invisible — ou pire, vous renvoyez une image qui ne vous ressemble plus.";

type Reason = {
  number: string;
  title: string;
  body: string;
};

const REASONS: readonly Reason[] = [
  {
    number: "01",
    title: "Vous restez introuvable",
    body: "Sans site bien référencé, vous n'apparaissez pas quand on tape « [votre métier] près de chez moi ». Vos concurrents, eux, oui.",
  },
  {
    number: "02",
    title: "Vos infos sont éparpillées",
    body: "Horaires sur Google, menu sur Facebook, prix sur Instagram… Un site, c'est un seul endroit clair où tout est à jour.",
  },
  {
    number: "03",
    title: "Vous perdez en crédibilité",
    body: "Un site daté ou inexistant donne une impression de « ils sont encore là ? ». Un site propre rassure et donne envie d'appeler.",
  },
  {
    number: "04",
    title: "Vous vous fondez dans la masse",
    body: "Un site qui vous ressemble — pas un template vu mille fois — vous démarque immédiatement de la concurrence.",
  },
] as const;

export function Why() {
  return (
    <section id="pourquoi" className="bg-card py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <FadeIn>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
            <div className="max-w-3xl">
              <SectionLabel number="02">Pourquoi</SectionLabel>
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
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-5"
          staggerChildren={0.08}
        >
          {REASONS.map((reason) => (
            <FadeIn key={reason.number} inside>
              <Card
                className={cn(
                  "h-full p-5 md:p-6",
                  "transition duration-200",
                  "hover:border-mint-500/40 hover:shadow-md",
                )}
              >
                <span className="font-mono text-xs uppercase tracking-widest text-mint-700">
                  {reason.number}
                </span>
                <h3 className="mt-2 font-sans text-lg font-semibold leading-snug text-ink-950">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">
                  {reason.body}
                </p>
              </Card>
            </FadeIn>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
