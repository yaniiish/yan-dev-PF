import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Étiquette d'introduction de section. Affiche systématiquement un em-dash
 * en préfixe pour donner un signal visuel discret avant le label.
 *
 * Ex : `<SectionLabel>Services</SectionLabel>` → `/ SERVICES`
 */
export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "font-mono text-xs uppercase tracking-widest text-mint-700",
        className,
      )}
    >
      / {children}
    </span>
  );
}
