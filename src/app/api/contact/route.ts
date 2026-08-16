import { NextResponse } from "next/server";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/content/locales";
import { sendContactMail } from "@/lib/mail";
import { contactSchema } from "@/lib/schema";

// nodemailer requiert les API Node (net/tls) : pas d'edge runtime.
export const runtime = "nodejs";

/**
 * Route de soumission du formulaire de contact.
 *
 * Valide le payload côté serveur, check le honeypot, puis envoie le mail
 * via SMTP OVH/Zimbra (compte `contact@yan-dev.fr`). Voir `lib/mail.ts` et
 * ARCHITECTURE.md §7 pour les variables d'environnement.
 *
 * La locale envoyée par le client décide de la langue des messages d'erreur
 * renvoyés. Elle vient d'un payload non fiable, donc on la valide avant de
 * l'utiliser et on retombe sur le français si elle est absente ou inconnue.
 */
function readLocale(body: unknown): Locale {
  const raw =
    typeof body === "object" && body !== null && "locale" in body
      ? (body as { locale?: unknown }).locale
      : undefined;
  return LOCALES.includes(raw as Locale) ? (raw as Locale) : DEFAULT_LOCALE;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Payload JSON invalide." },
      { status: 400 },
    );
  }

  const locale = readLocale(body);
  const parsed = contactSchema(locale).safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  // Honeypot : si le bot a rempli `website`, on accepte silencieusement
  // (200 sans rien faire) pour ne pas lui signaler qu'il a été détecté.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  try {
    await sendContactMail({
      email: parsed.data.email,
      phone: parsed.data.phone ?? "",
      activity: parsed.data.activity,
      message: parsed.data.message,
      locale: parsed.data.locale,
    });
  } catch (error) {
    console.error("[contact] échec envoi mail", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "L'envoi a échoué. Réessayez ou écrivez-nous directement par mail.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
