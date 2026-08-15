"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { BGPattern } from "@/components/backgrounds/BGPattern";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { durations, easings } from "@/lib/motion";
import { useSiteLoaded } from "@/lib/useSiteLoaded";
import { cn } from "@/lib/utils";

// Decoupage en deux lignes choisi pour equilibrer : la ligne la plus longue
// fait 33 caracteres au lieu de 35, ce qui laisse monter l'echelle du titre.
const H1_LINE_1 = "Creative Developer,";
const H1_LINE_2_PRE = "Website Creator &";
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
        // Hauteur d'ecran moins la navbar (h-16 puis md:h-20), en svh et non
        // dvh : le dvh se recalcule quand la barre d'adresse mobile se
        // retracte, ce qui fait sauter la mise en page pendant le scroll.
        // min-h et non h : si le contenu depasse, la section grandit.
        // Padding bas plus grand que le padding haut : avec items-center, ca
        // remonte le bloc au-dessus du centre geometrique, la ou l'oeil attend
        // le centre optique.
        className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden py-12 md:min-h-[calc(100svh-5rem)] md:pb-24 md:pt-16 lg:pb-28 lg:pt-20"
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
          {/* Le split ne s'active qu'a partir de lg : en dessous, le H1 sur
              deux lignes ne tient pas dans une colonne 7/12. */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="@container lg:col-span-7">
              {/* Taille exprimee en cqw, donc proportionnelle a la largeur de
                  la colonne : le titre occupe toujours la meme part de la
                  colonne, quel que soit le format. Le coefficient est cale sur
                  la ligne la plus longue avec une marge de securite, puisque
                  whitespace-nowrap ferait deborder au lieu de replier. */}
              <h1 className="font-serif text-[8.5cqw] font-medium leading-[1.05] tracking-tight text-ink-950">
                <MaskedLine variants={line}>
                  <span className="whitespace-nowrap">{H1_LINE_1}</span>
                </MaskedLine>
                <MaskedLine variants={line}>
                  <span className="whitespace-nowrap">
                    {H1_LINE_2_PRE}{" "}
                    <span className="underline decoration-mint-500 decoration-[3px] underline-offset-[6px]">
                      {H1_LINE_2_ACCENT}
                    </span>
                  </span>
                </MaskedLine>
              </h1>
              {/* Mesure unique pour les deux paragraphes : en max-w-*ch les
                  deux tailles de police donnaient deux bords droits differents,
                  ce qui lisait comme un decalage accidentel. */}
              {/* La mesure vient buter sur le bord de la colonne, donc sur le
                  bord droit de la deuxieme ligne du titre. */}
              <div data-hero-measure className="mt-8 max-w-[40rem] md:mt-12">
                <motion.p
                  variants={rise}
                  className="text-[clamp(1.125rem,0.6vw+0.9rem,1.5rem)] leading-relaxed text-ink-700"
                >
                  {LEAD}
                </motion.p>
                <motion.p
                  variants={rise}
                  className="mt-4 text-[clamp(1rem,0.2vw+0.95rem,1.125rem)] leading-relaxed text-ink-500"
                >
                  {INTRO}
                </motion.p>
              </div>
              <motion.div
                variants={rise}
                className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-12"
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
              className="mx-auto w-full max-w-md lg:col-span-5 lg:mx-0 lg:max-w-none"
            >
              <PresentationCard />
            </motion.div>
          </div>
        </motion.div>
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
    <Card className={cn("rounded-3xl p-6 md:p-8", "shadow-lg shadow-ink-950/5")}>
      {/* Disponibilite remontee sur la ligne du nom : "Yan" seul a cote de
          l'avatar laissait la moitie de la ligne vide. */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Image
            src="/avatar/avatar-yan.JPG"
            alt="Portrait de Yan, développeur web indépendant à Caen"
            width={2080}
            height={1867}
            sizes="56px"
            priority
            className="size-14 shrink-0 rounded-full object-cover"
          />
          <p className="min-w-0 font-serif text-xl font-medium leading-tight text-ink-950">
            {PRESENT_NAME}
          </p>
        </div>
        <span className="flex shrink-0 items-center gap-2">
          <span className="relative flex size-2.5" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint-500 opacity-60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-mint-500" />
          </span>
          <span className="text-sm text-ink-700">{PRESENT_AVAILABILITY}</span>
        </span>
      </div>

      {/* Le role occupe toute la largeur de la card : coince a cote de
          l'avatar, il passait sur 2 a 3 lignes selon le viewport. */}
      {/* Variante large seulement a partir de xl : c'est a 1024px que la card
          est la plus etroite (5 colonnes d'un petit container). */}
      <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-mint-700 xl:text-[0.7rem] xl:tracking-widest">
        {PRESENT_ROLE}
      </p>

      {/* La card garde sa hauteur naturelle : etiree sur la colonne, elle
          creusait de grands vides au-dessus et en dessous de la citation.
          C'est la taille de la citation qui lui donne sa presence. */}
      <blockquote className="mt-6 font-serif text-lg leading-snug text-ink-950 md:mt-8 md:text-xl lg:text-2xl">
        «&nbsp;{PRESENT_PITCH}&nbsp;»
      </blockquote>

      <p className="mt-4 border-t border-ink-300/60 pt-4 text-sm text-ink-500">
        {PRESENT_TAGLINE}
      </p>
    </Card>
  );
}
