import { ArrowRight } from "lucide-react";

export type RelatedLink = {
  label: string;
  href: string;
  description?: string;
};

/**
 * Bloc de liens internes (maillage). Copie passée en props, rien en dur.
 * Ne rend rien si la liste est vide.
 */
export function RelatedLinks({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<RelatedLink>;
}) {
  if (links.length === 0) return null;

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-mint-700">
        {title}
      </p>
      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-ink-300/60 bg-card p-4 transition duration-300 ease-out hover:-translate-y-0.5 hover:border-mint-500/40 hover:shadow-md hover:shadow-ink-950/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700"
            >
              <span className="min-w-0">
                <span className="block font-sans text-sm font-semibold tracking-tight text-ink-950">
                  {link.label}
                </span>
                {link.description ? (
                  <span className="mt-0.5 block text-xs text-ink-500">
                    {link.description}
                  </span>
                ) : null}
              </span>
              <ArrowRight
                size={16}
                aria-hidden="true"
                className="shrink-0 text-mint-700 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
