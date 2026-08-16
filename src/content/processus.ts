/**
 * Contenu de la section « Comment ça marche ». Cf. CONTENT.md §5.
 */

import type { Locale } from "./locales";

export type ProcessStep = {
  /** Numéro affiché en mono, sur deux chiffres. */
  number: string;
  title: string;
  /** Phrase d'accroche de l'étape, en gras. */
  lead: string;
  body: string;
  /**
   * Fragment de `body` à mettre en avant. Évite de stocker du balisage dans
   * le contenu tout en gardant l'accent sur l'acompte.
   */
  emphasis?: string;
};

type ProcessusContent = {
  label: string;
  h2: string;
  steps: readonly ProcessStep[];
};

const CONTENT: Record<Locale, ProcessusContent> = {
  fr: {
    label: "Comment ça marche",
    h2: "Un process de travail simple et transparent.",
    steps: [
      {
        number: "01",
        title: "On échange",
        lead: "Vous me présentez votre projet, vos besoins et vos contraintes.",
        body: "On échange sur vos objectifs, vos envies, votre budget et le niveau d'ambition du projet.",
      },
      {
        number: "02",
        title: "Je vous propose une direction",
        lead: "Je vous montre ce que je peux imaginer pour votre projet.",
        body: "Selon le besoin, je prépare une première direction, une petite maquette ou un aperçu visuel pour que vous puissiez vous projeter avant d'aller plus loin.",
      },
      {
        number: "03",
        title: "On valide et je construis",
        lead: "La direction vous convient ? On lance réellement le projet.",
        body: "On valide le périmètre et le tarif, vous versez un acompte de 30 %, puis je développe une version plus complète en intégrant vos retours au fil de l'avancement.",
        emphasis: "30 %",
      },
      {
        number: "04",
        title: "Validation et mise en ligne",
        lead: "Tout est prêt et validé.",
        body: "Une fois les derniers ajustements terminés, le solde est réglé et je m'occupe de la mise en ligne du projet.",
      },
    ],
  },
  en: {
    label: "How it works",
    h2: "A simple, transparent way of working.",
    steps: [
      {
        number: "01",
        title: "We talk",
        lead: "You walk me through your project, your needs and your constraints.",
        body: "We go over your goals, what you have in mind, your budget and how ambitious the project should be.",
      },
      {
        number: "02",
        title: "I propose a direction",
        lead: "I show you what I can imagine for your project.",
        body: "Depending on what you need, I put together a first direction, a small mockup or a visual preview, so you can picture the result before going any further.",
      },
      {
        number: "03",
        title: "You approve and I build",
        lead: "Happy with the direction? That is when the project really starts.",
        body: "We lock the scope and the price, you pay a 30% deposit, then I build the full version and fold in your feedback as the work progresses.",
        emphasis: "30%",
      },
      {
        number: "04",
        title: "Sign-off and launch",
        lead: "Everything is ready and approved.",
        body: "Once the final adjustments are done, the balance is settled and I take care of putting the project online.",
      },
    ],
  },
};

export function processusContent(locale: Locale): ProcessusContent {
  return CONTENT[locale];
}
