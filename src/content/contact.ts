/**
 * Contenu de la section Contact. Cf. CONTENT.md §7.
 * Les libellés du formulaire lui-même vivent dans `ui.ts`.
 */

import type { Locale } from "./locales";

type ContactContent = {
  label: string;
  h2: string;
  lead: string;
  mailLabel: string;
  instagramLabel: string;
};

const CONTENT: Record<Locale, ContactContent> = {
  fr: {
    label: "Contact",
    h2: "Contactez-moi ici.",
    lead: "Je réponds sous 24h (jours ouvrés). Pas de bot, pas d'agence intermédiaire, c'est moi qui lis et qui réponds.",
    mailLabel: "Vous préférez le mail ?",
    instagramLabel: "Ou sur Instagram",
  },
  en: {
    label: "Contact",
    h2: "Get in touch here.",
    lead: "I reply within 24 hours on business days. No bot, no agency in between: I read your message and I answer it myself.",
    mailLabel: "Prefer email?",
    instagramLabel: "Or on Instagram",
  },
};

export function contactContent(locale: Locale): ContactContent {
  return CONTENT[locale];
}
