import { FadeIn } from "@/components/motion/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WhyAccordion } from "./WhyAccordion";

const H2 = "Pas de site ? Des clients passent à côté de vous.";

const LEAD =
  "Aujourd'hui, vos clients cherchent des réponses rapides, claires et rassurantes avant même de vous contacter. Un site bien pensé vous permet d'être visible, de centraliser vos informations et de donner une image professionnelle dès le premier regard.";

const REASONS = [
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
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
          <FadeIn x={-48} duration={0.8} className="lg:col-span-5">
            <SectionLabel>Pourquoi</SectionLabel>
            <h2 className="mt-3 font-serif text-[clamp(1.875rem,2.5vw+1rem,3rem)] font-medium leading-[1.1] tracking-tight text-ink-950">
              {H2}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-500">
              {LEAD}
            </p>
          </FadeIn>

          <div className="lg:col-span-7">
            <WhyAccordion reasons={REASONS} />
          </div>
        </div>
      </div>
    </section>
  );
}
