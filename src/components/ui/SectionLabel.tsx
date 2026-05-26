import { cn } from "@/lib/utils";

type SectionLabelProps = {
  /** Numéro optionnel (ex "02"). S'il est omis, seul le label s'affiche. */
  number?: string;
  children: React.ReactNode;
  className?: string;
};

export function SectionLabel({
  number,
  children,
  className,
}: SectionLabelProps) {
  return (
    <span
      className={cn(
        "font-mono text-xs uppercase tracking-widest text-mint-700",
        className,
      )}
    >
      {number ? `${number} — ` : ""}
      {children}
    </span>
  );
}
