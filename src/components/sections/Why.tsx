import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger } from "@/components/motion/Stagger";
import { Card } from "@/components/ui/Card";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

const H2 = "Pas de site web, c'est des clients qui passent à côté.";

const LEAD =
  "Aujourd'hui, presque tout le monde cherche un commerce, un artisan ou un service sur Google avant de pousser la porte. Sans site clair et à jour, vous êtes invisible — ou pire, vous renvoyez une image qui ne vous ressemble plus.";

type Reason = {
  number: string;
  title: string;
  body: string;
};

const REASONS: readonly Reason[] = [
  {
    number: "01",
    title: "Vous restez introuvable",
    body: "Sans site bien référencé, vous n'apparaissez pas quand un client tape « [votre métier] près de chez moi ». Vos concurrents, eux, oui.",
  },
  {
    number: "02",
    title: "Vos infos sont éclatées partout",
    body: "Horaires sur Google, menu sur Facebook, prix sur Instagram… Un site, c'est un seul endroit clair où tout est à jour.",
  },
  {
    number: "03",
    title: "Vous perdez en crédibilité",
    body: "Un site daté (ou pas de site du tout) donne une impression de « ils sont encore là ? ». Un site propre rassure et donne envie d'appeler.",
  },
  {
    number: "04",
    title: "Vous vous fondez dans la masse",
    body: "Un site qui vous ressemble — pas un template vu mille fois — vous démarque immédiatement de la concurrence du quartier.",
  },
] as const;

export function Why() {
  return (
    <section
      id="pourquoi"
      className="bg-card py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <FadeIn>
          <SectionLabel number="02">Pourquoi</SectionLabel>
          <h2 className="mt-4 max-w-3xl font-serif text-[clamp(2rem,3.5vw+1rem,3.75rem)] font-medium leading-[1.05] tracking-tight text-ink-950">
            {H2}
          </h2>
          <p className="mt-6 max-w-2xl text-[clamp(1.125rem,0.5vw+1rem,1.25rem)] leading-relaxed text-ink-500">
            {LEAD}
          </p>
        </FadeIn>

        <Stagger
          className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 md:gap-6 lg:gap-8"
          staggerChildren={0.08}
        >
          {REASONS.map((reason) => (
            <FadeIn key={reason.number} inside>
              <Card
                className={cn(
                  "h-full transition duration-200",
                  "hover:border-mint-500/40 hover:shadow-md",
                )}
              >
                <span className="font-mono text-xs uppercase tracking-widest text-mint-700">
                  {reason.number}
                </span>
                <h3 className="mt-3 font-sans text-[clamp(1.25rem,1vw+1rem,1.625rem)] font-semibold leading-tight text-ink-950">
                  {reason.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink-700">
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
