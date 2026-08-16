/**
 * Micro-copy transverse : libellés d'interface, aria-labels, états du
 * formulaire et messages de validation. Tout ce qui n'appartient pas à une
 * section précise mais reste du texte visible ou lu par un lecteur d'écran.
 */

import type { Locale } from "./locales";

type UiContent = {
  skipToContent: string;
  ctaContact: string;
  nav: {
    mainLabel: string;
    openMenu: string;
    closeMenu: string;
    menuDialogLabel: string;
    localeSwitcherLabel: string;
  };
  loader: string;
  breadcrumbLabel: string;
  tooltip: {
    /** Reçoit le nom de l'offre. */
    aboutPrice: (offer: string) => string;
    /** Reçoit le libellé de la ligne. */
    about: (label: string) => string;
  };
  carousel: {
    /** Reçoit (index, total). */
    slideLabel: (index: number, total: number) => string;
    previous: string;
    next: string;
  };
  showcase: {
    /** Reçoit le titre de l'élément, ex: "BeerBee". */
    visitLabel: (title: string) => string;
    /** Reçoit `itemNoun`, ex: "le site" / "the site". */
    selectLabel: (noun: string) => string;
  };
  form: {
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    activityLabel: string;
    activityPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    errorPrefix: string;
    errorSuffix: string;
  };
  validation: {
    required: string;
    invalidEmail: string;
    phoneTooLong: string;
    tooLong: string;
    messageTooShort: string;
    messageTooLong: string;
  };
};

const CONTENT: Record<Locale, UiContent> = {
  fr: {
    skipToContent: "Aller au contenu",
    ctaContact: "Discuter de mon projet",
    nav: {
      mainLabel: "Navigation principale",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
      menuDialogLabel: "Menu de navigation",
      localeSwitcherLabel: "Choisir la langue",
    },
    loader: "Chargement du site",
    breadcrumbLabel: "Fil d'ariane",
    tooltip: {
      aboutPrice: (offer) => `À propos du tarif : ${offer}`,
      about: (label) => `À propos de : ${label}`,
    },
    carousel: {
      slideLabel: (index, total) => `Exemple ${index} sur ${total}`,
      previous: "Exemple précédent",
      next: "Exemple suivant",
    },
    showcase: {
      visitLabel: (title) => `Voir ${title}, nouvelle fenêtre`,
      selectLabel: (noun) => `Voir ${noun} `,
    },
    form: {
      emailLabel: "Email",
      emailPlaceholder: "vous@exemple.fr",
      phoneLabel: "Téléphone",
      phonePlaceholder: "06 12 34 56 78",
      activityLabel: "Votre activité / entreprise",
      activityPlaceholder: "Boulangerie, cabinet, restaurant…",
      messageLabel: "Votre message",
      messagePlaceholder:
        "Décrivez en quelques lignes ce que vous avez en tête.",
      submit: "Envoyer ma demande",
      submitting: "Envoi…",
      successTitle: "Message reçu",
      successBody: "Je vous réponds très vite, sous 24h jours ouvrés.",
      errorPrefix: "Une erreur est survenue, réessayez ou écrivez-moi directement à",
      errorSuffix: ".",
    },
    validation: {
      required: "Ce champ est requis.",
      invalidEmail: "Cet email ne semble pas valide.",
      phoneTooLong: "Numéro trop long.",
      tooLong: "Trop long.",
      messageTooShort: "Votre message doit faire au moins 10 caractères.",
      messageTooLong: "Message trop long.",
    },
  },
  en: {
    skipToContent: "Skip to content",
    ctaContact: "Tell me about your project",
    nav: {
      mainLabel: "Main navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      menuDialogLabel: "Navigation menu",
      localeSwitcherLabel: "Choose language",
    },
    loader: "Loading the site",
    breadcrumbLabel: "Breadcrumb",
    tooltip: {
      aboutPrice: (offer) => `About the price: ${offer}`,
      about: (label) => `About: ${label}`,
    },
    carousel: {
      slideLabel: (index, total) => `Example ${index} of ${total}`,
      previous: "Previous example",
      next: "Next example",
    },
    showcase: {
      visitLabel: (title) => `View ${title}, opens in a new window`,
      selectLabel: (noun) => `View ${noun} `,
    },
    form: {
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      phoneLabel: "Phone",
      phonePlaceholder: "+33 6 12 34 56 78",
      activityLabel: "Your business",
      activityPlaceholder: "Bakery, studio, restaurant…",
      messageLabel: "Your message",
      messagePlaceholder: "Tell me in a few lines what you have in mind.",
      submit: "Send my request",
      submitting: "Sending…",
      successTitle: "Message received",
      successBody: "I will get back to you within 24 hours on business days.",
      errorPrefix: "Something went wrong. Try again, or email me directly at",
      errorSuffix: ".",
    },
    validation: {
      required: "This field is required.",
      invalidEmail: "This email does not look valid.",
      phoneTooLong: "Number too long.",
      tooLong: "Too long.",
      messageTooShort: "Your message must be at least 10 characters.",
      messageTooLong: "Message too long.",
    },
  },
};

export function uiContent(locale: Locale): UiContent {
  return CONTENT[locale];
}
