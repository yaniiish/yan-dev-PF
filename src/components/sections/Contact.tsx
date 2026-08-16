import { Mail } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { contactContent } from "@/content/contact";
import type { Locale } from "@/content/locales";
import {
  CONTACT_EMAIL,
  CONTACT_INSTAGRAM_HANDLE,
  CONTACT_INSTAGRAM_URL,
} from "@/content/site";
import { ContactForm } from "./ContactForm";

/** Icône Instagram (retirée de lucide-react) au même gabarit que les icônes lucide. */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Contact({ locale }: { locale: Locale }) {
  const content = contactContent(locale);

  return (
    <section id="contact" className="bg-card py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <SectionLabel>{content.label}</SectionLabel>
            <h2 className="mt-3 font-serif text-[clamp(1.875rem,2.5vw+1rem,3rem)] font-medium leading-[1.1] tracking-tight text-ink-950">
              {content.h2}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-500">
              {content.lead}
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <div className="inline-flex w-fit items-center gap-3 rounded-xl border border-ink-300/60 bg-ink-50 px-4 py-3">
                <Mail
                  size={20}
                  className="shrink-0 text-mint-700"
                  aria-hidden="true"
                />
                <div className="flex flex-col">
                  <span className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-500">
                    {content.mailLabel}
                  </span>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-sm font-medium text-ink-950 underline decoration-mint-500 decoration-2 underline-offset-4 hover:decoration-mint-700"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="inline-flex w-fit items-center gap-3 rounded-xl border border-ink-300/60 bg-ink-50 px-4 py-3">
                <InstagramIcon className="shrink-0 text-mint-700" />
                <div className="flex flex-col">
                  <span className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-500">
                    {content.instagramLabel}
                  </span>
                  <a
                    href={CONTACT_INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-ink-950 underline decoration-mint-500 decoration-2 underline-offset-4 hover:decoration-mint-700"
                  >
                    {CONTACT_INSTAGRAM_HANDLE}
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn x={32} y={0} duration={0.65}>
            <ContactForm locale={locale} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
