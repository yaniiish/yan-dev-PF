import Image from "next/image";
import { BGPattern } from "@/components/backgrounds/BGPattern";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/utils";

const H1_PRE = "Un site web clair, moderne et rapide,";
const H1_POST = "pensé pour vous faire trouver";

const LEAD =
  "Je crée des sites vitrines modernes et rapides pour artisans, commerçants et indépendants — du site classique au site plus premium. Un site qui inspire confiance et vous rend visible sur Google.";

const PRESENT_NAME = "Yan";
const PRESENT_TITLE = "Développeur web indépendant";
const PRESENT_PITCH =
  "Passionné d'informatique depuis toujours, je serai ravi de mettre mes compétences à votre service. Vous travaillez en direct avec moi, sans intermédiaire.";
const PRESENT_CHIPS = ["Next.js", "SEO local", "Réponse sous 24h"] as const;

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[90svh] overflow-hidden py-20 md:min-h-[88vh] md:py-28 lg:py-36"
    >
      <BGPattern variant="grid" mask="fade-edges" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center md:gap-8">
          <div className="md:col-span-6 lg:col-span-7">
            <FadeIn>
              <SectionLabel number="01">Accueil</SectionLabel>
            </FadeIn>
            <FadeIn delay={0.06}>
              <h1 className="mt-4 font-serif text-[clamp(2.5rem,5vw+1rem,5.5rem)] font-medium leading-[1.05] tracking-tight text-ink-950">
                {H1_PRE}{" "}
                <span className="underline decoration-mint-500 decoration-[3px] underline-offset-[6px]">
                  {H1_POST}
                </span>
                .
              </h1>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="mt-6 max-w-[60ch] text-[clamp(1.125rem,0.5vw+1rem,1.25rem)] leading-relaxed text-ink-700">
                {LEAD}
              </p>
            </FadeIn>
            <FadeIn delay={0.18}>
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
            <FadeIn delay={0.24} y={24}>
              <PresentationCard />
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
        "rounded-3xl p-6 md:p-8 lg:p-10",
        "shadow-lg shadow-ink-950/5",
      )}
    >
      <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-4">
        <Image
          src="/avatar/avatar-yan.JPG"
          alt="Portrait de Yan, développeur web indépendant à Caen"
          width={2080}
          height={1867}
          sizes="(max-width: 768px) 80px, (max-width: 1024px) 120px, 160px"
          priority
          className="size-20 shrink-0 rounded-3xl object-cover md:size-[120px] lg:size-40"
        />
        <div className="min-w-0">
          <h3 className="font-serif text-[clamp(1.25rem,1vw+1rem,1.625rem)] font-medium leading-tight text-ink-950">
            {PRESENT_NAME}
          </h3>
          <p className="mt-1 text-sm text-ink-500">{PRESENT_TITLE}</p>
        </div>
      </div>

      <hr className="my-5 border-ink-300/60 md:my-6" />

      <p className="text-base leading-relaxed text-ink-700">{PRESENT_PITCH}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {PRESENT_CHIPS.map((chip) => (
          <span
            key={chip}
            className="inline-flex items-center rounded-xl border border-ink-300 px-3 py-1 font-mono text-xs text-ink-700"
          >
            {chip}
          </span>
        ))}
      </div>
    </Card>
  );
}
