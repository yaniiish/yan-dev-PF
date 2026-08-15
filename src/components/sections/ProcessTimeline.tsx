"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { ProcessStep } from "@/content/processus";
import { cn } from "@/lib/utils";

type ProcessTimelineProps = {
  steps: readonly ProcessStep[];
};

type Node = { x: number; y: number };
type Layout = { width: number; height: number; nodes: Node[] };

/** Position horizontale des ancres, en fraction de la largeur. */
const ANCHOR_LEFT = 0.42;
const ANCHOR_RIGHT = 0.58;
/** Amplitude du renflement, en multiple de l'écart horizontal entre ancres. */
const SWING = 1.35;
/** Position du rail quand tout est empilé, en pixels depuis la gauche. */
const STACKED_X = 20;
/** Décalage vertical de l'ancre par rapport au haut de l'étape. */
const ANCHOR_OFFSET = 14;

/**
 * Fil serpentin qui se dessine au scroll, étapes de part et d'autre.
 * Le tracé n'est pas figé : il est reconstruit à partir de la position réelle
 * de chaque étape, donc il reste juste quels que soient la longueur des textes
 * et le format d'écran.
 *
 * Le progrès vient de `useScroll`, jamais d'un écouteur de scroll : un
 * listener se déclenche à chaque frame et fait re-rendre tout l'arbre React.
 */
export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [layout, setLayout] = useState<Layout | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    // Le fil démarre quand le haut de la liste arrive aux trois quarts de
    // l'écran et finit quand le bas approche le bas de l'écran.
    offset: ["start 0.8", "end 0.8"],
  });

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const wide = window.matchMedia("(min-width: 1024px)");

    const measure = () => {
      const rect = wrap.getBoundingClientRect();
      const nodes = stepRefs.current
        .filter((el): el is HTMLLIElement => el !== null)
        .map((el, index) => {
          const stepRect = el.getBoundingClientRect();
          return {
            x: wide.matches
              ? (index % 2 === 0 ? ANCHOR_LEFT : ANCHOR_RIGHT) * rect.width
              : STACKED_X,
            y: stepRect.top - rect.top + ANCHOR_OFFSET,
          };
        });
      setLayout({ width: rect.width, height: rect.height, nodes });
    };

    // rAF plutôt qu'un appel direct : la mesure attend que la mise en page
    // soit posée, et on évite un setState synchrone dans le corps de l'effet.
    const frame = requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(wrap);
    wide.addEventListener("change", measure);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      wide.removeEventListener("change", measure);
    };
  }, [steps.length]);

  const path = layout ? buildPath(layout.nodes) : "";

  return (
    <div ref={wrapRef} className="relative">
      {layout && path ? (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full"
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d={path}
            stroke="var(--color-ink-300)"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
          {/* key sur le tracé : Motion calcule la longueur du chemin au
              montage pour piloter pathLength. Sans remontage, un `d`
              recalculé après une mesure garde l'ancienne longueur et le fil
              plafonne avant la fin. */}
          <motion.path
            key={path}
            d={path}
            stroke="var(--color-mint-500)"
            strokeWidth={1.5}
            strokeLinecap="round"
            style={reduce ? undefined : { pathLength: scrollYProgress }}
          />
          {layout.nodes.map((node, index) => (
            <TimelineNode
              key={steps[index]?.number ?? index}
              node={node}
              threshold={node.y / layout.height}
              progress={scrollYProgress}
              reduce={Boolean(reduce)}
            />
          ))}
        </svg>
      ) : null}

      <ol className="relative space-y-16 lg:space-y-32">
        {steps.map((step, index) => (
          <Step
            key={step.number}
            ref={(el) => {
              stepRefs.current[index] = el;
            }}
            step={step}
            index={index}
            threshold={
              layout?.nodes[index] && layout.height
                ? layout.nodes[index].y / layout.height
                : 0
            }
            progress={scrollYProgress}
            reduce={Boolean(reduce)}
          />
        ))}
      </ol>
    </div>
  );
}

/**
 * Relie les ancres par des courbes cubiques dont les points de contrôle
 * partent à l'opposé de la cible : c'est ce qui donne le renflement du
 * serpentin au lieu d'une simple diagonale.
 */
function buildPath(nodes: Node[]): string {
  if (nodes.length === 0) return "";

  let d = `M ${nodes[0].x} ${nodes[0].y}`;
  for (let i = 1; i < nodes.length; i += 1) {
    const from = nodes[i - 1];
    const to = nodes[i];
    const halfway = (to.y - from.y) / 2;
    const spread = (to.x - from.x) * SWING;
    d += ` C ${from.x - spread} ${from.y + halfway}, ${to.x + spread} ${to.y - halfway}, ${to.x} ${to.y}`;
  }
  return d;
}

function TimelineNode({
  node,
  threshold,
  progress,
  reduce,
}: {
  node: Node;
  threshold: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const opacity = useTransform(
    progress,
    [Math.max(threshold - 0.05, 0), threshold],
    [0, 1],
  );

  return (
    <>
      <circle cx={node.x} cy={node.y} r={5} fill="var(--color-ink-50)" />
      <circle
        cx={node.x}
        cy={node.y}
        r={5}
        stroke="var(--color-ink-300)"
        strokeWidth={1}
      />
      <motion.circle
        cx={node.x}
        cy={node.y}
        r={3}
        fill="var(--color-mint-500)"
        style={reduce ? undefined : { opacity }}
      />
    </>
  );
}

function Step({
  ref,
  step,
  index,
  threshold,
  progress,
  reduce,
}: {
  ref: (el: HTMLLIElement | null) => void;
  step: ProcessStep;
  index: number;
  threshold: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  // Le texte se révèle juste avant que le fil n'atteigne son ancre : la
  // lecture suit le tracé au lieu de le précéder.
  const range: [number, number] = [
    Math.max(threshold - 0.16, 0),
    Math.max(threshold - 0.02, 0.01),
  ];
  const opacity = useTransform(progress, range, [0, 1]);
  const shift = useTransform(progress, range, [24, 0]);

  const isLeft = index % 2 === 0;

  return (
    <li ref={ref} className="relative pl-14 lg:grid lg:grid-cols-2 lg:pl-0">
      <motion.div
        style={reduce ? undefined : { opacity, y: shift }}
        className={cn(
          isLeft
            ? "lg:col-start-1 lg:row-start-1 lg:pr-24 lg:text-right"
            : "lg:col-start-2 lg:row-start-1 lg:pl-24",
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
            "mt-2 max-w-[42ch] leading-relaxed text-ink-500",
            isLeft && "lg:ml-auto",
          )}
        >
          <Body text={step.body} emphasis={step.emphasis} />
        </p>
      </motion.div>
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
