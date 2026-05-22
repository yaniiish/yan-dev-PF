import { z } from "zod";

/**
 * Schéma de validation du formulaire de contact.
 * Utilisé côté client (ContactForm) et côté serveur (route api/contact)
 * pour garantir la cohérence.
 */
export const ContactSchema = z.object({
  email: z.string().min(1, "Ce champ est requis.").email("Cet email ne semble pas valide."),
  phone: z.string().max(30, "Numéro trop long.").optional().or(z.literal("")),
  activity: z.string().min(1, "Ce champ est requis.").max(120, "Trop long."),
  message: z
    .string()
    .min(10, "Votre message doit faire au moins 10 caractères.")
    .max(5000, "Message trop long."),
  // Honeypot anti-bot : doit rester vide.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof ContactSchema>;
