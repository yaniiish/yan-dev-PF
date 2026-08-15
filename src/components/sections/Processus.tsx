import { BGPattern } from "@/components/backgrounds/BGPattern";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PROCESS_STEPS } from "@/content/processus";
import { ProcessTimeline } from "./ProcessTimeline";

const H2 = "Un process de travail simple et transparent.";

export function Processus() {
  return (
    <section
      id="processus"
      className="relative overflow-hidden py-16 md:py-20 lg:py-24"
    >
      {/* La section precedente est en aplat blanc : un fond a points sur
          celle-ci relance le rythme sans repeter le grid du hero. */}
      <BGPattern
        variant="dots"
        mask="fade-y"
        size={28}
        fill="color-mix(in oklch, var(--color-ink-300) 60%, transparent)"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center">
            <SectionLabel>Comment ça marche</SectionLabel>
            <h2 className="mt-3 font-serif text-[clamp(1.875rem,2.5vw+1rem,3rem)] font-medium leading-[1.1] tracking-tight text-ink-950">
              {H2}
            </h2>
          </div>
        </FadeIn>

        <div className="mx-auto mt-14 max-w-6xl lg:mt-20">
          <ProcessTimeline steps={PROCESS_STEPS} />
        </div>
      </div>
    </section>
  );
}
