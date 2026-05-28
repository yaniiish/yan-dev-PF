import { Mail } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CONTACT_EMAIL } from "@/content/site";
import { ContactForm } from "./ContactForm";

const H2 = "Une idée, une question ? Écrivez-moi.";

const LEAD =
  "Je réponds sous 24h (jours ouvrés). Pas de bot, pas d'agence intermédiaire — c'est moi qui lis et qui réponds.";

export function Contact() {
  return (
    <section id="contact" className="bg-card py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <SectionLabel>Contact</SectionLabel>
            <h2 className="mt-3 font-serif text-[clamp(1.875rem,2.5vw+1rem,3rem)] font-medium leading-[1.1] tracking-tight text-ink-950">
              {H2}
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-500">
              {LEAD}
            </p>

            <div className="mt-8 inline-flex items-center gap-3 rounded-xl border border-ink-300/60 bg-ink-50 px-4 py-3">
              <Mail
                size={20}
                className="shrink-0 text-mint-700"
                aria-hidden="true"
              />
              <div className="flex flex-col">
                <span className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-500">
                  Vous préférez le mail ?
                </span>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-sm font-medium text-ink-950 underline decoration-mint-500 decoration-2 underline-offset-4 hover:decoration-mint-700"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn x={32} y={0} duration={0.65}>
            <ContactForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
