import {
  CITY,
  CONTACT_EMAIL,
  NAV_LINKS,
  SITE_NAME,
} from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 text-ink-50">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20 lg:px-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          <div>
            <p className="font-sans text-base font-semibold tracking-tight">
              {SITE_NAME}
            </p>
            <p className="mt-3 max-w-xs text-sm text-ink-300">
              Studio web freelance, basé à {CITY}, à votre service partout en
              France.
            </p>
          </div>

          <nav aria-label="Liens du site">
            <p className="font-mono text-xs uppercase tracking-widest text-ink-300">
              Navigation
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="text-sm text-ink-50 transition-colors hover:text-mint-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-300">
              Contact
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="break-words text-sm text-ink-50 transition-colors hover:text-mint-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-ink-700/40 pt-8 text-sm text-ink-300">
          <p>
            © {year} {SITE_NAME}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
