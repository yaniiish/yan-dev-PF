import { NextResponse } from "next/server";
import { ContactSchema } from "@/lib/schema";

/**
 * Route de soumission du formulaire de contact.
 *
 * **Phase 1.5 (MVP, sans domaine)** : valide le payload côté serveur, check
 * le honeypot, logge la soumission et renvoie 200. Aucun mail n'est envoyé.
 *
 * **TODO Phase 1.9 (achat du domaine)** : remplacer le `console.log` par
 * un envoi via Resend (ou SMTP). Voir ROADMAP.md §1.9. Les variables d'env
 * `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` sont prévues
 * pour ça (cf. ARCHITECTURE.md §7).
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

  // Debug log pour la phase MVP. À retirer / remplacer par l'envoi mail
  // en Phase 1.9.
  console.log("[contact] nouvelle soumission", {
    email: parsed.data.email,
    activity: parsed.data.activity,
    phone: parsed.data.phone || "(non renseigné)",
    messageLength: parsed.data.message.length,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
