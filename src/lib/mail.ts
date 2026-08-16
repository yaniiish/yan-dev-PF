import nodemailer from "nodemailer";
import type { Locale } from "@/content/locales";

/**
 * Transporteur SMTP pour l'envoi du mail de contact.
 *
 * Envoi via le serveur SMTP OVH/Zimbra avec le compte `contact@yan-dev.fr`.
 * Toutes les valeurs sensibles viennent des variables d'environnement
 * (cf. ARCHITECTURE.md §7) — rien n'est en dur ici, jamais commit.
 *
 * SMTP OVH : `ssl0.ovh.net`, port 465 (SSL/TLS implicite).
 */

function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Variable d'environnement manquante : ${name}`);
  }
  return value;
}

/**
 * Crée le transporteur à la volée (pas de singleton : les fonctions
 * serverless Vercel sont éphémères, une connexion par invocation suffit).
 */
function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "ssl0.ovh.net",
    port: Number(process.env.SMTP_PORT ?? "465"),
    secure: true, // port 465 = TLS implicite
    auth: {
      user: getEnv("SMTP_USER"),
      pass: getEnv("SMTP_PASS"),
    },
  });
}

export type ContactMailPayload = {
  email: string;
  phone: string;
  activity: string;
  message: string;
  /** Langue du site depuis laquelle la demande a été envoyée. */
  locale: Locale;
};

/**
 * Envoie le mail récapitulant une soumission du formulaire de contact.
 *
 * - `from` : la boîte authentifiée (`CONTACT_FROM_EMAIL`) pour préserver
 *   l'authentification SPF/DKIM/DMARC déjà en place.
 * - `to` : `CONTACT_TO_EMAIL` (la boîte qui reçoit les demandes).
 * - `replyTo` : l'email du visiteur, pour répondre directement au prospect.
 */
export async function sendContactMail(payload: ContactMailPayload) {
  const from = getEnv("CONTACT_FROM_EMAIL");
  const to = getEnv("CONTACT_TO_EMAIL");
  const transport = createTransport();

  const phone = payload.phone || "(non renseigné)";
  // Le mail reste en français : c'est Yan qui le lit. En revanche la langue de
  // la demande est indiquée, pour qu'il sache dans quelle langue répondre.
  const langue = payload.locale === "en" ? "anglais" : "français";

  const text = [
    "Nouvelle demande via le formulaire de contact yan-dev.fr",
    "",
    `Langue    : ${langue}`,
    `Email     : ${payload.email}`,
    `Téléphone : ${phone}`,
    `Activité  : ${payload.activity}`,
    "",
    "Message :",
    payload.message,
  ].join("\n");

  await transport.sendMail({
    from: `Formulaire yan-dev <${from}>`,
    to,
    replyTo: payload.email,
    subject: `Nouveau contact : ${payload.activity}`,
    text,
  });
}
