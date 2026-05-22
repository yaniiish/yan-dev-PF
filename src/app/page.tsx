import { Examples } from "@/components/sections/Examples";
import { Hero } from "@/components/sections/Hero";
import { Pricing } from "@/components/sections/Pricing";
import { Services } from "@/components/sections/Services";
import { Why } from "@/components/sections/Why";

type PlaceholderSection = {
  id: string;
  number: string;
  label: string;
  surface: string;
  numberClass: string;
  labelClass: string;
  hint?: string;
};

// Sections encore en placeholder — remplacées en phase 1.4f.
const PLACEHOLDER_SECTIONS: readonly PlaceholderSection[] = [
  {
    id: "contact",
    number: "06",
    label: "Contact",
    surface: "bg-ink-50",
    numberClass: "text-mint-700",
    labelClass: "text-ink-950",
  },
] as const;

export default function Home() {
  return (
    <>
      <Hero />
      <Why />
      <Services />
      <Examples />
      <Pricing />
      {PLACEHOLDER_SECTIONS.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={`flex min-h-screen items-center justify-center ${section.surface}`}
        >
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-6 text-center md:px-10 lg:px-16">
            <span
              className={`font-mono text-xs uppercase tracking-widest ${section.numberClass}`}
            >
              {section.number} — {section.label}
            </span>
            <h2
              className={`font-serif text-[clamp(2rem,3.5vw+1rem,3.75rem)] font-medium leading-[1.05] tracking-tight ${section.labelClass}`}
            >
              {section.label}
            </h2>
            {section.hint ? (
              <p className="max-w-[60ch] text-sm text-ink-300">
                {section.hint}
              </p>
            ) : null}
          </div>
        </section>
      ))}
    </>
  );
}
