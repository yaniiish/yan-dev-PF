import { NAV_LINKS, SITE_NAME } from "@/content/site";

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
      <DebugNav />
      <main id="main">
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
      </main>
    </>
  );
}

/**
 * Mini barre de navigation de debug — uniquement pour la Phase 0.
 * Sera remplacée par la vraie Navbar à l'étape 1.3.
 */
function DebugNav() {
  return (
    <nav
      aria-label="Navigation de debug"
      className="sticky top-0 z-40 border-b border-ink-300/60 bg-ink-50/80 backdrop-blur-sm"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6 md:h-20 md:px-10 lg:px-16">
        <a
          href="#hero"
          className="font-sans text-base font-semibold tracking-tight text-ink-950"
        >
          {SITE_NAME}
        </a>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-700">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className="rounded-md px-2 py-1 transition-colors hover:text-ink-950"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
