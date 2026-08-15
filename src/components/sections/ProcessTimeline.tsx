"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ProcessStep } from "@/content/processus";
import { cn } from "@/lib/utils";

type ProcessTimelineProps = {
  steps: readonly ProcessStep[];
};

/**
 * Fil vertical qui se remplit au scroll, étapes en zigzag de part et d'autre
 * à partir de lg. Le remplissage raconte l'avancement du projet : c'est le
 * sujet même de la section, pas une animation de décoration.
 *
 * Le progrès vient de `useScroll`, jamais d'un écouteur de scroll : un
 * listener se déclenche à chaque frame et fait re-rendre tout l'arbre React.
 */
export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const containerRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Le fil démarre quand le haut de la liste arrive aux trois quarts de
    // l'écran et finit quand le bas approche le bas de l'écran. Terminer plus
    // tôt obligeait à scroller au-delà de la section pour voir le fil complet.
    offset: ["start 0.8", "end 0.8"],
  });

  return (
    <div className="relative">
      {/* Rail : à gauche en pile, au centre en zigzag. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-5 w-px -translate-x-1/2 bg-ink-300/60 lg:left-1/2"
      >
        <motion.div
          className="h-full w-full origin-top bg-mint-500"
          style={reduce ? undefined : { scaleY: scrollYProgress }}
        />
      </div>

      <ol ref={containerRef} className="relative space-y-14 lg:space-y-20">
        {steps.map((step, index) => (
          <Step
            key={step.number}
            step={step}
            index={index}
            total={steps.length}
            progress={scrollYProgress}
            reduce={Boolean(reduce)}
          />
        ))}
      </ol>
    </div>
  );
}

function Step({
  step,
  index,
  total,
  progress,
  reduce,
}: {
  step: ProcessStep;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduce: boolean;
}) {
  // Le point s'allume quand le fil l'atteint. Seuils répartis sur la course
  // sans jamais atteindre 1 : cale sur index/(total-1), le dernier point ne
  // s'allumait qu'au pixel exact de fin de course.
  const threshold = (index + 0.7) / total;
  const nodeOpacity = useTransform(
    progress,
    [Math.max(threshold - 0.08, 0), threshold],
    [0, 1],
  );

  const isLeft = index % 2 === 0;

  return (
    <li className="relative pl-14 lg:grid lg:grid-cols-2 lg:gap-x-16 lg:pl-0">
      <span
        aria-hidden="true"
        className="absolute left-5 top-1.5 flex size-3.5 -translate-x-1/2 items-center justify-center rounded-full bg-ink-100 lg:left-1/2"
      >
        <span className="absolute inset-0 rounded-full border border-ink-300/60" />
        <motion.span
          className="size-2 rounded-full bg-mint-500"
          style={reduce ? undefined : { opacity: nodeOpacity }}
        />
      </span>

      <div
        className={cn(
          isLeft
            ? "lg:col-start-1 lg:row-start-1 lg:pr-16 lg:text-right"
            : "lg:col-start-2 lg:row-start-1 lg:pl-16",
        )}
      >
        <p className="font-mono text-xs uppercase tracking-widest text-mint-700">
          {step.number}
        </p>
        <h3 className="mt-2 font-serif text-2xl font-medium leading-tight text-ink-950">
          {step.title}
        </h3>
        <p className="mt-3 font-semibold text-ink-950">{step.lead}</p>
        <p
          className={cn(
            "mt-2 max-w-[46ch] leading-relaxed text-ink-500",
            isLeft && "lg:ml-auto",
          )}
        >
          <Body text={step.body} emphasis={step.emphasis} />
        </p>
      </div>
    </li>
  );
}

/** Met en gras un fragment du corps sans stocker de balisage dans le contenu. */
function Body({ text, emphasis }: { text: string; emphasis?: string }) {
  if (!emphasis) return <>{text}</>;

  const at = text.indexOf(emphasis);
  if (at === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, at)}
      <strong className="font-semibold text-ink-950">{emphasis}</strong>
      {text.slice(at + emphasis.length)}
    </>
  );
}
