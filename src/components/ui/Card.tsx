import { cn } from "@/lib/utils";

type CardProps = {
  className?: string;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "children">;

export function Card({ className, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-ink-300/60 bg-card p-6 shadow-sm md:p-8",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
