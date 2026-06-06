import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ExamplesCarousel, type Project } from "./ExamplesCarousel";

const H2 = "Ce que ça donne, concrètement.";

const LEAD =
  "Je conçois un site simple et efficace, avec une approche adaptée à vos besoins.";

const PROJECTS: readonly Project[] = [
  {
    id: "restaurant",
    label: "Projet 01",
    title: "Site exemple restaurant",
    description: "Aperçu du site complet.",
    href: "https://site-pf-2.vercel.app/",
    image: {
      src: "/projects/restaurant.png",
      alt: "Aperçu du header du site exemple restaurant",
      width: 1618,
      height: 910,
    },
  },
  {
    id: "coffee",
    label: "Projet 02",
    title: "Site exemple coffee shop",
    description: "Aperçu du site complet.",
    href: "https://greencp-test.vercel.app/",
    image: {
      src: "/projects/coffee.png",
      alt: "Aperçu du header du site exemple coffee shop",
      width: 1618,
      height: 910,
    },
  },
  {
    id: "boulangerie",
    label: "Projet 03",
    title: "Site exemple boulangerie",
    description: "Aperçu du site complet.",
    href: "https://site-pf-1.vercel.app/",
    image: {
      src: "/projects/boulangerie.png",
      alt: "Aperçu du header du site exemple boulangerie",
      width: 1618,
      height: 910,
    },
  },
  {
    id: "soon",
    label: "Projet 04",
    title: "D'autres projets sont à venir.",
    description: "",
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

        <FadeIn y={24} className="mx-auto mt-12 max-w-4xl lg:mt-14">
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
