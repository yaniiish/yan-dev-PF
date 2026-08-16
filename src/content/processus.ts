/**
 * Contenu de la section « Comment ça marche ». Cf. CONTENT.md §5.
 */

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

export const PROCESS_STEPS: readonly ProcessStep[] = [
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
] as const;
