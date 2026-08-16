import { ChevronRight } from "lucide-react";
import type { Locale } from "@/content/locales";
import { uiContent } from "@/content/ui";
import { cn } from "@/lib/utils";

export type Crumb = {
  name: string;
  /** Lien relatif. Absent (ou pour le dernier item) = page courante, non cliquable. */
  href?: string;
};

/**
 * Fil d'ariane visuel. Le dernier item est marqué comme page courante.
 * Le JSON-LD BreadcrumbList correspondant est injecté à part via breadcrumbLd().
 */
export function Breadcrumb({
  items,
  locale,
  className,
}: {
  items: ReadonlyArray<Crumb>;
  locale: Locale;
  className?: string;
}) {
  return (
    <nav aria-label={uiContent(locale).breadcrumbLabel} className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-ink-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.name} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="transition-colors hover:text-mint-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700"
                >
                  {item.name}
                </a>
              ) : (
                <span aria-current="page" className="text-ink-700">
                  {item.name}
                </span>
              )}
              {!isLast ? (
                <ChevronRight
                  size={12}
                  aria-hidden="true"
                  className={cn("shrink-0 text-ink-300")}
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
