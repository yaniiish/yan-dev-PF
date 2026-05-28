import { LayoutTemplate, MapPin, Send, Server } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger } from "@/components/motion/Stagger";
import { Card } from "@/components/ui/Card";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

const H2 = "Ce que je mets en place pour vous.";

const LEAD =
  "Tout est inclus dans l'offre de base. Pas de surprise, pas d'options cachées.";

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
    body: "Un site one-page moderne, responsive (mobile, tablette, ordinateur), conçu autour de votre activité. Pas de template recyclé.",
    Icon: LayoutTemplate,
  },
  {
    number: "02",
    title: "Référencement local",
    body: "Les bases SEO bien faites : balises, structure, vitesse, fiche Google Business, schema.org local. De quoi remonter sur les recherches du coin.",
    Icon: MapPin,
  },
  {
    number: "03",
    title: "Formulaire de contact",
    body: "Un formulaire simple qui vous envoie directement les demandes par email. Protégé contre le spam, prêt à l'emploi.",
    Icon: Send,
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
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-5"
          staggerChildren={0.18}
        >
          {SERVICES.map(({ number, title, body, Icon }) => (
            <FadeIn key={number} inside x={-32} y={0} duration={0.65}>
              <Card
                className={cn(
                  "h-full p-5 md:p-6",
                  "shadow-md shadow-ink-950/5",
                  "transition duration-300 ease-out",
                  "hover:-translate-y-1 hover:border-mint-500/40 hover:shadow-xl hover:shadow-ink-950/10",
                )}
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-mint-50 text-mint-700">
                  <Icon size={24} aria-hidden="true" />
                </div>
                <span className="mt-5 block font-mono text-xs uppercase tracking-widest text-mint-700">
                  {number}
                </span>
                <h3 className="mt-2 font-sans text-lg font-semibold leading-snug text-ink-950">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">
                  {body}
                </p>
              </Card>
            </FadeIn>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
