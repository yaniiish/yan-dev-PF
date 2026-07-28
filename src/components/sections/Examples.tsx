import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { METIERS_BASE } from "@/content/metiers";
import { ExamplesCarousel, type Project } from "./ExamplesCarousel";

const H2 = "Ce que ça donne, concrètement.";

const LEAD =
  "Je conçois un site simple et efficace, avec une approche adaptée à vos besoins.";

const PROJECTS: readonly Project[] = [
  {
    id: "madman-tattoo",
    label: "Projet 01",
    title: "Madman Tattoo",
    description: "Tatoueur",
    href: "https://madman-tattoo.vercel.app/",
    image: {
      src: "/projects/madman-tattoo.jpg",
      alt: "Aperçu du site exemple tatoueur Madman Tattoo",
      width: 1618,
      height: 910,
    },
  },
  {
    id: "restaurant",
    label: "Projet 02",
    title: "L'océan",
    description: "Restaurant",
    href: "https://site-pf-2.vercel.app/",
    image: {
      src: "/projects/restaurant.png",
      alt: "Aperçu du site exemple restaurant L'océan",
      width: 1618,
      height: 910,
    },
  },
  {
    id: "atelier-lume",
    label: "Projet 03",
    title: "Atelier Lumé",
    description: "Architecte d'intérieur",
    href: "https://atelier-lume-kappa.vercel.app/",
    image: {
      src: "/projects/atelier-lume.png",
      alt: "Aperçu du site exemple architecte d'intérieur Atelier Lumé",
      width: 1618,
      height: 910,
    },
  },
  {
    id: "boulangerie",
    label: "Projet 04",
    title: "Boulangerie Bonheur",
    description: "Boulangerie",
    href: "https://site-pf-1.vercel.app/",
    image: {
      src: "/projects/boulangerie.png",
      alt: "Aperçu du site exemple boulangerie Boulangerie Bonheur",
      width: 1618,
      height: 910,
    },
  },
  {
    id: "lumio",
    label: "Projet 05",
    title: "Lumio-coffee",
    description: "Coffee shop",
    href: "https://lumio-coffee.vercel.app/",
    image: {
      src: "/projects/lumio.png",
      alt: "Aperçu du site exemple coffee shop Lumio-coffee",
      width: 1618,
      height: 910,
    },
  },
  {
    id: "cerf-dore",
    label: "Projet 06",
    title: "Le Cerf Doré",
    description: "Bistrot",
    href: "https://cerf-dore.vercel.app/",
    image: {
      src: "/projects/cerf-dore.png",
      alt: "Aperçu du site exemple bistrot Le Cerf Doré",
      width: 1618,
      height: 910,
    },
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
          <Button href={METIERS_BASE} variant="secondary" size="md">
            Des exemples par métier
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
