import { cn } from "@/lib/utils";

type SectionLabelProps = {
  number: string;
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
      {number} — {children}
    </span>
  );
}
