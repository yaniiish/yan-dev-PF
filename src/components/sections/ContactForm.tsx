"use client";

import { useId, useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { CONTACT_EMAIL } from "@/content/site";
import { ContactSchema, type ContactInput } from "@/lib/schema";

type Status = "idle" | "loading" | "success" | "error";
type FieldErrors = Partial<Record<keyof ContactInput, string>>;

export function ContactForm() {
  const baseId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    const formData = new FormData(event.currentTarget);
    const raw = {
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      activity: String(formData.get("activity") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    const result = ContactSchema.safeParse(raw);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof ContactInput;
        if (key && !fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      setStatus("idle");
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        // Erreur 400 : on récupère les erreurs de champ pour les afficher.
        if (response.status === 400) {
          const payload = (await response.json().catch(() => null)) as
            | { errors?: Partial<Record<keyof ContactInput, string[]>> }
            | null;
          if (payload?.errors) {
            const apiErrors: FieldErrors = {};
            for (const [key, messages] of Object.entries(payload.errors)) {
              if (messages && messages.length > 0) {
                apiErrors[key as keyof ContactInput] = messages[0];
              }
            }
            setErrors(apiErrors);
            setStatus("idle");
            return;
          }
        }
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-2xl border border-mint-500/40 bg-mint-50 p-8 text-center shadow-md shadow-ink-950/5"
      >
        <CheckCircle2
          size={40}
          className="mx-auto text-mint-700"
          aria-hidden="true"
        />
        <h3 className="mt-4 font-serif text-2xl font-medium text-ink-950">
          Message reçu
        </h3>
        <p className="mt-2 text-base text-ink-700">
          Je vous réponds très vite, sous 24h jours ouvrés.
        </p>
      </div>
    );
  }

  const isSubmitting = status === "loading";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-ink-300/60 bg-card p-6 shadow-md shadow-ink-950/5 md:p-8"
    >
      <div className="flex flex-col gap-4">
        <Input
          id={`${baseId}-email`}
          name="email"
          type="email"
          label="Email"
          required
          inputMode="email"
          autoComplete="email"
          placeholder="vous@exemple.fr"
          error={errors.email}
        />
        <Input
          id={`${baseId}-phone`}
          name="phone"
          type="tel"
          label="Téléphone"
          inputMode="tel"
          autoComplete="tel"
          placeholder="06 12 34 56 78"
          error={errors.phone}
        />
        <Input
          id={`${baseId}-activity`}
          name="activity"
          type="text"
          label="Votre activité / entreprise"
          required
          autoComplete="organization-title"
          placeholder="Boulangerie, cabinet, restaurant…"
          error={errors.activity}
        />
        <Textarea
          id={`${baseId}-message`}
          name="message"
          label="Votre message"
          required
          rows={5}
          placeholder="Décrivez en quelques lignes ce que vous avez en tête."
          error={errors.message}
        />

        {/* Honeypot anti-bot : champ caché qui doit rester vide. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] size-0"
        />

        <Button
          type="submit"
          size="lg"
          className="mt-2 w-full"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "Envoi…" : "Envoyer ma demande"}
        </Button>

        {status === "error" ? (
          <p role="alert" className="text-sm text-error">
            Une erreur est survenue, réessayez ou écrivez-moi directement à{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="underline decoration-error decoration-2 underline-offset-4"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}
