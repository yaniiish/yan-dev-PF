import { NextResponse } from "next/server";
import { ContactSchema } from "@/lib/schema";
import { sendContactMail } from "@/lib/mail";

// nodemailer requiert les API Node (net/tls) : pas d'edge runtime.
export const runtime = "nodejs";

/**
 * Route de soumission du formulaire de contact.
 *
 * Valide le payload côté serveur, check le honeypot, puis envoie le mail
 * via SMTP OVH/Zimbra (compte `contact@yan-dev.fr`). Voir `lib/mail.ts` et
 * ARCHITECTURE.md §7 pour les variables d'environnement.
 */
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

  const parsed = ContactSchema.safeParse(body);
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
