"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { BGPattern } from "@/components/backgrounds/BGPattern";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { durations, easings } from "@/lib/motion";
import { useSiteLoaded } from "@/lib/useSiteLoaded";
import { cn } from "@/lib/utils";

const H1_LINE_1 = "Creative Developer, Website Creator";
const H1_LINE_2_PRE = "&";
const H1_LINE_2_ACCENT = "Product Builder";

const LEAD =
  "Sites web créatifs, sites vitrines plus simples et produits digitaux.";

const CTA_PRIMARY = "Voir mes projets";
const CTA_SECONDARY = "Discuter d'un projet";

const INTRO =
  "Du site vitrine simple à l'expérience web plus créative, jusqu'au produit digital complet. Je conçois chaque projet selon ses besoins, ses ambitions et son budget, sans jamais sacrifier la qualité.";

const PRESENT_NAME = "Yan";
const PRESENT_ROLE = "Creative Developer · Product Builder";
const PRESENT_PITCH =
  "J'aime transformer une idée en quelque chose de concret, qu'il s'agisse d'un simple site vitrine ou d'un produit digital complet.";
const PRESENT_TAGLINE = "Je travaille en direct, sans intermédiaire.";
const PRESENT_AVAILABILITY = "Disponible actuellement";

export function Hero() {
  const isLoaded = useSiteLoaded();
  const reduce = useReducedMotion();

  // Orchestration : le titre monte ligne par ligne, puis le lead, les CTA et
  // la card. Sert la hiérarchie de lecture, dans l'ordre où on lit la page.
  const container: Variants = {
    hidden: {},
    show: {
      transition: reduce ? {} : { staggerChildren: 0.09, delayChildren: 0.04 },
    },
  };

  const line: Variants = {
    hidden: reduce ? { opacity: 0 } : { y: "110%" },
    show: {
      opacity: 1,
      y: "0%",
      transition: { duration: 0.75, ease: easings.out },
    },
  };

  const rise: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: durations.base, ease: easings.out },
    },
  };

  const card: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, x: 40, rotate: -8 },
    show: {
      opacity: 1,
      x: 0,
      rotate: reduce ? 0 : -3,
      transition: { duration: 0.8, ease: easings.out },
    },
  };

  return (
    <>
      <section
        id="hero"
        className="relative overflow-hidden py-10 md:pb-24 md:pt-24 lg:pb-28 lg:pt-24"
      >
        <BGPattern
          variant="grid"
          mask="fade-edges"
          fill="color-mix(in oklch, var(--color-ink-300) 50%, transparent)"
        />

        <motion.div
          className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10 lg:px-16"
          variants={container}
          initial={false}
          animate={isLoaded ? "show" : "hidden"}
        >
          <h1 className="font-serif text-[clamp(2.25rem,4vw+1rem,4.5rem)] font-medium leading-[1.05] tracking-tight text-ink-950">
            <MaskedLine variants={line}>{H1_LINE_1}</MaskedLine>
            <MaskedLine variants={line}>
              {H1_LINE_2_PRE}{" "}
              <span className="underline decoration-mint-500 decoration-[3px] underline-offset-[6px]">
                {H1_LINE_2_ACCENT}
              </span>
            </MaskedLine>
          </h1>

          <div className="mt-8 grid grid-cols-1 gap-10 md:mt-10 md:grid-cols-12 md:items-start md:gap-8">
            <div className="md:col-span-6 md:pt-2 lg:col-span-7">
              <motion.p
                variants={rise}
                className="max-w-[46ch] text-[clamp(1.125rem,0.5vw+1rem,1.25rem)] leading-relaxed text-ink-700"
              >
                {LEAD}
              </motion.p>
              <motion.div
                variants={rise}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <Button href="#exemples" size="lg">
                  {CTA_PRIMARY}
                </Button>
                <Button href="#contact" size="lg" variant="secondary">
                  {CTA_SECONDARY}
                </Button>
              </motion.div>
            </div>

            <motion.div
              variants={card}
              whileHover={reduce ? undefined : { rotate: 0 }}
              transition={{ duration: 0.5, ease: easings.out }}
              className="md:col-span-6 lg:col-span-5"
            >
              <PresentationCard />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section
        aria-label="Présentation"
        className="relative mx-auto w-full max-w-7xl px-6 pb-8 md:px-10 md:pb-12 lg:px-16"
      >
        <FadeIn y={24}>
          <p className="max-w-[62ch] border-l border-mint-500 pl-6 text-[clamp(1rem,0.4vw+0.9rem,1.125rem)] leading-relaxed text-ink-700">
            {INTRO}
          </p>
        </FadeIn>
      </section>
    </>
  );
}

/**
 * Ligne de titre révélée depuis le bas derrière un masque.
 * Le padding compense la coupe des jambages (p, g) par l'overflow.
 */
function MaskedLine({
  children,
  variants,
}: {
  children: React.ReactNode;
  variants: Variants;
}) {
  return (
    <span className="block overflow-hidden pb-[0.12em]">
      <motion.span className="block" variants={variants}>
        {children}
      </motion.span>
    </span>
  );
}

function PresentationCard() {
  return (
    <Card className={cn("rounded-3xl p-6 md:p-7", "shadow-lg shadow-ink-950/5")}>
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
