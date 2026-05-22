import { NAV_LINKS } from "@/content/site";

type SectionId = (typeof NAV_LINKS)[number]["id"];

type PlaceholderSection = {
  id: SectionId;
  number: string;
  label: string;
  surface: string;
  numberClass: string;
  labelClass: string;
  hint?: string;
};

const SECTIONS: readonly PlaceholderSection[] = [
  {
    id: "hero",
    number: "01",
    label: "Accueil",
    surface: "bg-ink-50",
    numberClass: "text-mint-700",
    labelClass: "text-ink-950",
  },
  {
    id: "pourquoi",
    number: "02",
    label: "Pourquoi",
    surface: "bg-card",
    numberClass: "text-mint-700",
    labelClass: "text-ink-950",
  },
  {
    id: "services",
    number: "03",
    label: "Services",
    surface: "bg-mint-50/40",
    numberClass: "text-mint-700",
    labelClass: "text-ink-950",
  },
  {
    id: "exemples",
    number: "04",
    label: "Exemples",
    surface: "bg-card",
    numberClass: "text-mint-700",
    labelClass: "text-ink-950",
  },
  {
    id: "tarifs",
    number: "05",
    label: "Tarifs",
    surface: "bg-ink-950",
    numberClass: "text-mint-500",
    labelClass: "text-ink-50",
    hint: "Section sombre pour casser le rythme.",
  },
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
      {SECTIONS.map((section) => (
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
