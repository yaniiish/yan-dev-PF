import { LayoutTemplate, MapPin, Send, Server } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger } from "@/components/motion/Stagger";
import { Card } from "@/components/ui/Card";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

const H2 = "Ce que je mets en place pour vous.";

const LEAD =
  "Tout inclus, sans surprise. Et toujours ouvert à vos besoins spécifiques.";

type Service = {
  number: string;
  title: string;
  body: string;
  Icon: LucideIcon;
};

const SERVICES: readonly Service[] = [
  {
    number: "01",
    title: "Site vitrine sur mesure",
    body: "Un site moderne, responsive (mobile, tablette, ordinateur), conçu autour de votre activité et vos couleurs. Pas de template recyclé.",
    Icon: LayoutTemplate,
  },
  {
    number: "02",
    title: "Formulaire de contact",
    body: "Un formulaire simple qui vous envoie directement les demandes par email. Protégé contre le spam, prêt à l'emploi.",
    Icon: Send,
  },
  {
    number: "03",
    title: "Référencement",
    body: "Les bases SEO bien faites : balises, structure, vitesse et schema.org. Pour remonter dans les recherches de votre secteur.",
    Icon: MapPin,
  },
  {
    number: "04",
    title: "Hébergement & maintenance",
    body: "Je gère le nom de domaine, l'hébergement, les mises à jour et les petites modifications du quotidien. Vous n'avez rien à toucher.",
    Icon: Server,
  },
] as const;

export function Services() {
  return (
    <section id="services" className="bg-ink-50 py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <FadeIn>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-12">
            <div className="max-w-3xl">
              <SectionLabel>Services</SectionLabel>
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
          className={cn(
            "relative mt-12 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-10",
            "lg:mt-16 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-0",
          )}
          staggerChildren={0.18}
        >
          {/* Timeline horizontale (lg+ uniquement). Passe pile au centre
              vertical des cercles (top = 24px, soit demi-hauteur de h-12). */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-mint-500/30 lg:block"
          />

          {SERVICES.map(({ number, title, body, Icon }) => (
            <FadeIn key={number} inside x={-32} y={0} duration={0.65}>
              <div className="group/item flex h-full flex-col">
                {/* Cercle icône posé sur la timeline */}
                <div className="relative z-10 mb-5 flex h-12 justify-center lg:mb-6">
                  <div
                    className={cn(
                      "flex size-12 items-center justify-center rounded-full border-2 bg-card",
                      "transition-[transform,background-color,border-color,box-shadow] duration-300 ease-out",
                      "border-mint-500/30",
                      "group-hover/item:scale-110 group-hover/item:border-mint-500 group-hover/item:bg-mint-500",
                      "group-hover/item:shadow-[0_0_0_8px_color-mix(in_oklch,var(--color-mint-500)_18%,transparent)]",
                    )}
                  >
                    <Icon
                      size={20}
                      aria-hidden="true"
                      className="text-mint-700 transition-colors duration-300 ease-out group-hover/item:text-ink-950"
                    />
                  </div>
                </div>

                {/* Card */}
                <Card
                  className={cn(
                    "h-full p-5 md:p-6",
                    "shadow-md shadow-ink-950/5",
                    "transition duration-300 ease-out",
                    "group-hover/item:-translate-y-1 group-hover/item:border-mint-500/40 group-hover/item:shadow-xl group-hover/item:shadow-ink-950/10",
                  )}
                >
                  <span className="font-mono text-xs uppercase tracking-widest text-mint-700">
                    {number}
                  </span>
                  <h3 className="mt-2 font-sans text-lg font-semibold leading-snug text-ink-950">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700">
                    {body}
                  </p>
                </Card>
              </div>
            </FadeIn>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
