import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger } from "@/components/motion/Stagger";
import { Card } from "@/components/ui/Card";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

const H2 = "Pas de site ? Des clients passent à côté de vous.";

const LEAD =
  "Aujourd'hui, vos clients cherchent des réponses rapides, claires et rassurantes avant même de vous contacter. Un site bien pensé vous permet d'être visible, de centraliser vos informations et de donner une image professionnelle dès le premier regard.";

type Reason = {
  number: string;
  title: string;
  body: string;
};

const REASONS: readonly Reason[] = [
  {
    number: "01",
    title: "Être visible au bon moment",
    body: "La plupart des clients se décident en ligne avant même de vous appeler. Votre site devient votre vitrine, disponible 24h/24.",
  },
  {
    number: "02",
    title: "Centraliser l'essentiel",
    body: "Horaires, tarifs, réalisations : tout est clair, à jour et réuni au même endroit. Fini les infos éparpillées.",
  },
  {
    number: "03",
    title: "Inspirer confiance",
    body: "Un site bien conçu crée une première impression forte, avant même le premier contact. Et souvent, c'est ce qui fait la différence.",
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
          className="mt-10 grid grid-cols-1 gap-4 lg:mt-12 lg:grid-cols-3 lg:gap-5"
          staggerChildren={0.18}
        >
          {REASONS.map((reason) => (
            <FadeIn key={reason.number} inside x={-32} y={0} duration={0.65}>
              <Card
                className={cn(
                  "h-full p-5 md:p-6",
                  "shadow-md shadow-ink-950/5",
                  "transition duration-300 ease-out",
                  "hover:-translate-y-1 hover:border-mint-500/40 hover:shadow-xl hover:shadow-ink-950/10",
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
