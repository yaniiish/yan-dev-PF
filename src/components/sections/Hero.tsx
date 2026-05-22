import Image from "next/image";
import { BGPattern } from "@/components/backgrounds/BGPattern";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const H1 = "Un site web clair, moderne et rapide.";

const LEAD =
  "Je crée des sites vitrines modernes et rapides pour artisans, commerçants et indépendants — du site classique au site plus premium. Un site qui inspire confiance et vous rend visible sur Google.";

const PRESENT_NAME = "Yan";
const PRESENT_ROLE = "Développeur · Indépendant";
const PRESENT_PITCH =
  "Passionné d'informatique depuis toujours, je serai ravi de mettre mes compétences à votre service.";
const PRESENT_TAGLINE = "Je travaille en direct, sans intermédiaire.";
const PRESENT_AVAILABILITY = "Disponible actuellement";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[90svh] overflow-hidden pb-20 pt-10 md:min-h-[88vh] md:pb-28 md:pt-12 lg:pb-32 lg:pt-16"
    >
      <BGPattern variant="grid" mask="fade-edges" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6 lg:col-span-7">
            <FadeIn x={-48} duration={0.7}>
              <h1 className="font-serif text-[clamp(2.5rem,5vw+1rem,5.5rem)] font-medium leading-[1.05] tracking-tight text-ink-950">
                {H1}
              </h1>
              <p className="mt-6 max-w-[60ch] text-[clamp(1.125rem,0.5vw+1rem,1.25rem)] leading-relaxed text-ink-700">
                {LEAD}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#contact" size="lg">
                  Discuter de mon projet
                </Button>
                <Button href="#tarifs" size="lg" variant="secondary">
                  Voir mes tarifs
                </Button>
              </div>
            </FadeIn>
          </div>

          <div className="md:col-span-6 lg:col-span-5">
            <FadeIn x={48} y={0} duration={0.7}>
              <div className="group/card -rotate-[3deg] transition-transform duration-500 ease-out hover:rotate-0">
                <PresentationCard />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

function PresentationCard() {
  return (
    <Card
      className={cn(
        "rounded-3xl p-6 md:p-7",
        "shadow-lg shadow-ink-950/5",
      )}
    >
      <div className="flex items-center gap-3">
        <Image
          src="/avatar/avatar-yan.JPG"
          alt="Portrait de Yan, développeur web indépendant à Caen"
          width={2080}
          height={1867}
          sizes="56px"
          priority
          className="size-14 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="font-serif text-xl font-medium leading-tight text-ink-950">
            {PRESENT_NAME}
          </p>
          <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-widest text-mint-700">
            {PRESENT_ROLE}
          </p>
        </div>
      </div>

      <blockquote className="mt-6 font-serif text-lg leading-snug text-ink-950">
        «&nbsp;{PRESENT_PITCH}&nbsp;»
      </blockquote>

      <p className="mt-3 text-sm text-ink-500">{PRESENT_TAGLINE}</p>

      <div className="mt-6 flex items-center gap-2 border-t border-ink-300/60 pt-4">
        <span className="relative flex size-2.5" aria-hidden="true">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint-500 opacity-60" />
          <span className="relative inline-flex size-2.5 rounded-full bg-mint-500" />
        </span>
        <span className="text-sm text-ink-700">{PRESENT_AVAILABILITY}</span>
      </div>
    </Card>
  );
}
