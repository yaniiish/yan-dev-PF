import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ExamplesCarousel, type Project } from "./ExamplesCarousel";

const H2 = "Ce que ça donne, concrètement.";

const LEAD =
  "Je conçois un site simple et efficace, avec une approche adaptée à vos besoins.";

const PROJECTS: readonly Project[] = [
  {
    id: "p1",
    label: "Projet 01",
    title: "Projet 1",
    description: "Visuel à venir.",
  },
  {
    id: "p2",
    label: "Projet 02",
    title: "Projet 2",
    description: "Visuel à venir.",
  },
  {
    id: "p3",
    label: "Projet 03",
    title: "Projet 3",
    description: "Visuel à venir.",
  },
] as const;

export function Examples() {
  return (
    <section id="exemples" className="bg-card py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Exemples</SectionLabel>
            <h2 className="mt-3 font-serif text-[clamp(1.875rem,2.5vw+1rem,3rem)] font-medium leading-[1.1] tracking-tight text-ink-950">
              {H2}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink-500">
              {LEAD}
            </p>
          </div>
        </FadeIn>

        <FadeIn y={24} className="mt-12 lg:mt-14">
          <ExamplesCarousel projects={PROJECTS} />
        </FadeIn>

        <FadeIn className="mt-12 text-center">
          <p className="text-sm text-ink-500">
            Un besoin spécifique qui sort du cadre&nbsp;?
          </p>
          <div className="mt-4">
            <Button href="#contact" variant="secondary" size="md">
              Discutons-en
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
