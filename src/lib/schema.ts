import { z } from "zod";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/content/locales";
import { uiContent } from "@/content/ui";

/**
 * Schéma de validation du formulaire de contact.
 * Utilisé côté client (ContactForm) et côté serveur (route api/contact)
 * pour garantir la cohérence.
 *
 * Les messages sont traduits, donc le schéma est construit par locale. La
 * locale voyage dans le payload : sans elle, un visiteur anglophone recevrait
 * les erreurs du serveur en français.
 */
export function contactSchema(locale: Locale) {
  const { validation } = uiContent(locale);

  return z.object({
    email: z
      .string()
      .min(1, validation.required)
      .email(validation.invalidEmail),
    phone: z.string().max(30, validation.phoneTooLong).optional().or(z.literal("")),
    activity: z.string().min(1, validation.required).max(120, validation.tooLong),
    message: z
      .string()
      .min(10, validation.messageTooShort)
      .max(5000, validation.messageTooLong),
    // Honeypot anti-bot : doit rester vide.
    website: z.string().max(0).optional().or(z.literal("")),
    locale: z.enum(LOCALES).default(DEFAULT_LOCALE),
  });
}

export type ContactInput = z.infer<ReturnType<typeof contactSchema>>;
