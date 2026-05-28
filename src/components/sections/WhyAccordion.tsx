"use client";

import { useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { easings } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Reason = {
  number: string;
  title: string;
  body: string;
};

type WhyAccordionProps = {
  reasons: readonly Reason[];
  /** Index ouvert par défaut (0 = premier). Mettre -1 pour tout fermé. */
  defaultOpenIndex?: number;
};

export function WhyAccordion({
  reasons,
  defaultOpenIndex = 0,
}: WhyAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpenIndex);
  const baseId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll progress 0 → 1 :
  //   - 0 quand le haut du container vient juste d'entrer par le bas du viewport
  //   - 1 quand le haut du container atteint le centre du viewport
  // → l'animation des 3 cards est entièrement terminée quand Pourquoi est
  //   "bien en place" à l'écran (avant que la section ne sorte).
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start center"],
  });

  // Latch monotonique : on garde le max de progress jamais atteint pour
  // que les cards ne disparaissent JAMAIS quand on remonte (ou quand le
  // user revient sur la section).
  const maxProgress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > maxProgress.get()) {
      maxProgress.set(latest);
    }
  });

  function toggle(idx: number) {
    setOpenIndex((current) => (current === idx ? -1 : idx));
  }

  return (
    <div ref={containerRef} className="flex flex-col gap-3">
      {reasons.map((reason, idx) => (
        <WhyAccordionItem
          key={reason.number}
          reason={reason}
          idx={idx}
          isOpen={openIndex === idx}
          onToggle={() => toggle(idx)}
          baseId={baseId}
          scrollProgress={maxProgress}
        />
      ))}
    </div>
  );
}

type WhyAccordionItemProps = {
  reason: Reason;
  idx: number;
  isOpen: boolean;
  onToggle: () => void;
  baseId: string;
  scrollProgress: MotionValue<number>;
};

// Plages de progress par card. Les 3 cards complètent leur animation
// avant que le progress atteigne 1 (= haut de Pourquoi au centre du
// viewport). Gaps de 5% entre cards pour un effet "scroll un peu plus".
const CARD_RANGES: ReadonlyArray<readonly [number, number]> = [
  [0.0, 0.3],
  [0.35, 0.65],
  [0.7, 1.0],
];

function WhyAccordionItem({
  reason,
  idx,
  isOpen,
  onToggle,
  baseId,
  scrollProgress,
}: WhyAccordionItemProps) {
  const reduceMotion = useReducedMotion();
  const headerId = `${baseId}-header-${idx}`;
  const panelId = `${baseId}-panel-${idx}`;

  const [start, end] = CARD_RANGES[idx] ?? [0, 0.3];

  const opacity = useTransform(
    scrollProgress,
    [start, end],
    reduceMotion ? [1, 1] : [0, 1],
  );
  const x = useTransform(
    scrollProgress,
    [start, end],
    reduceMotion ? [0, 0] : [48, 0],
  );

  return (
    <motion.div
      style={{ opacity, x }}
      className={cn(
        "overflow-hidden rounded-2xl border bg-card",
        "transition-[border-color,box-shadow] duration-300 ease-out",
        isOpen
          ? "border-mint-500/40 shadow-lg shadow-ink-950/5"
          : "border-ink-300/60 shadow-sm hover:border-ink-300 hover:shadow-md",
      )}
    >
      <button
        type="button"
        id={headerId}
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={cn(
          "flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6 md:py-6",
          "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-mint-700",
        )}
      >
        <h3 className="font-serif text-xl font-medium leading-tight text-ink-950 md:text-2xl">
          {reason.title}
        </h3>
        <div className="flex shrink-0 items-center gap-3 md:gap-4">
          <ChevronDown
            size={20}
            aria-hidden="true"
            className={cn(
              "text-ink-500 transition-transform duration-300 ease-out",
              isOpen && "rotate-180 text-mint-700",
            )}
          />
          <span
            aria-hidden="true"
            className={cn(
              "font-mono text-2xl font-semibold tracking-tight md:text-3xl",
              "transition-colors duration-300",
              isOpen ? "text-mint-700" : "text-mint-500",
            )}
          >
            {reason.number}
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key="panel"
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={
              reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }
            }
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: easings.out }}
            className="overflow-hidden"
          >
            <div className="border-t border-ink-300/60 px-5 py-5 md:px-6 md:py-6">
              <p className="text-base leading-relaxed text-ink-700">
                {reason.body}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
