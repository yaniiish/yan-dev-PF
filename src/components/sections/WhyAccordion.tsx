"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger } from "@/components/motion/Stagger";
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
  const reduceMotion = useReducedMotion();
  const baseId = useId();

  function toggle(idx: number) {
    setOpenIndex((current) => (current === idx ? -1 : idx));
  }

  return (
    <Stagger
      className="flex flex-col gap-3"
      staggerChildren={0.25}
      delayChildren={0.3}
    >
      {reasons.map((reason, idx) => {
        const isOpen = openIndex === idx;
        const headerId = `${baseId}-header-${idx}`;
        const panelId = `${baseId}-panel-${idx}`;

        return (
          <FadeIn
            key={reason.number}
            inside
            x={48}
            y={0}
            duration={0.8}
          >
            <div
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
                onClick={() => toggle(idx)}
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
                <span
                  aria-hidden="true"
                  className={cn(
                    "shrink-0 font-mono text-2xl font-semibold tracking-tight md:text-3xl",
                    "transition-colors duration-300",
                    isOpen ? "text-mint-700" : "text-mint-500",
                  )}
                >
                  {reason.number}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="panel"
                    id={panelId}
                    role="region"
                    aria-labelledby={headerId}
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : { height: 0, opacity: 0 }
                    }
                    animate={
                      reduceMotion
                        ? { opacity: 1 }
                        : { height: "auto", opacity: 1 }
                    }
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { height: 0, opacity: 0 }
                    }
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
            </div>
          </FadeIn>
        );
      })}
    </Stagger>
  );
}
