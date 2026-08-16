import Image from "next/image";
import type { Locale } from "@/content/locales";
import { METIERS_PAGE } from "@/content/metiers";
import { pricingContent } from "@/content/pricing";
import { CONTACT_EMAIL, siteContent, SITE_NAME } from "@/content/site";
import { anchorHref, route } from "@/lib/routes";

export function Footer({ locale }: { locale: Locale }) {
  const { navLinks, footer } = siteContent(locale);
  const pricing = pricingContent(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-950 text-ink-50">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20 lg:px-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-4">
          <div>
            <p className="flex items-center gap-2 font-sans text-base font-semibold tracking-tight">
              <Image
                src="/logo.svg"
                alt=""
                width={28}
                height={28}
                className="size-7"
                aria-hidden="true"
              />
              {SITE_NAME}
            </p>
            <p className="mt-3 max-w-xs text-sm text-ink-300">
              {footer.baseline}
            </p>
          </div>

          <nav aria-label={footer.navLabel}>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-300">
              {footer.navTitle}
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={anchorHref(link.href, locale, false)}
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
              {footer.resourcesTitle}
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              <li>
                <a
                  href={route("pricing", locale)}
                  className="text-sm text-ink-50 transition-colors hover:text-mint-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700"
                >
                  {pricing.page.breadcrumbLabel}
                </a>
              </li>
              {/* L'index métiers n'existe qu'en français : il cible le SEO
                  local et n'a pas d'équivalent anglais. On n'envoie pas un
                  visiteur anglophone sur une page qu'il ne peut pas lire. */}
              {locale === "fr" ? (
                <li>
                  <a
                    href={METIERS_PAGE.path}
                    className="text-sm text-ink-50 transition-colors hover:text-mint-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700"
                  >
                    {METIERS_PAGE.navLabel}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ink-300">
              {footer.contactTitle}
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
            © {year} {SITE_NAME}. {footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
