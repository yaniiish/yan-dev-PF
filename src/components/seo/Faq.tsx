"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { easings } from "@/lib/motion";
import { cn } from "@/lib/utils";

export type FaqItem = { question: string; answer: string };

/**
 * Accordéon FAQ réutilisable. Le JSON-LD FAQPage est injecté séparément
 * côté page serveur via faqLd() (mêmes items).
 */
export function Faq({ items }: { items: ReadonlyArray<FaqItem> }) {
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const baseId = useId();
  const reduceMotion = useReducedMotion();

  function toggle(index: number) {
    setOpenIndex((current) => (current === index ? -1 : index));
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const headerId = `${baseId}-header-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div
            key={item.question}
            className={cn(
              "overflow-hidden rounded-2xl border bg-card",
              "transition-[border-color,box-shadow] duration-300 ease-out",
              isOpen
                ? "border-mint-500/40 shadow-lg shadow-ink-950/5"
                : "border-ink-300/60 shadow-sm hover:border-ink-300 hover:shadow-md",
            )}
          >
            <h3>
              <button
                type="button"
                id={headerId}
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className={cn(
                  "flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6 md:py-6",
                  "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-mint-700",
                )}
              >
                <span className="font-serif text-lg font-medium leading-snug text-ink-950 md:text-xl">
                  {item.question}
                </span>
                <ChevronDown
                  size={20}
                  aria-hidden="true"
                  className={cn(
                    "shrink-0 text-ink-500 transition-transform duration-300 ease-out",
                    isOpen && "rotate-180 text-mint-700",
                  )}
                />
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={
                    reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }
                  }
                  animate={
                    reduceMotion
                      ? { opacity: 1 }
                      : { height: "auto", opacity: 1 }
                  }
                  exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: easings.out }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-ink-300/60 px-5 py-5 md:px-6 md:py-6">
                    <p className="text-base leading-relaxed text-ink-700">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
