import { cn } from "@/lib/utils";

type TextareaProps = {
  id: string;
  label: string;
  error?: string;
  className?: string;
} & Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "id" | "className" | "aria-invalid" | "aria-describedby"
>;

export function Textarea({
  id,
  label,
  error,
  className,
  required,
  rows = 5,
  ...rest
}: TextareaProps) {
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-ink-700">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-0.5 text-error">
            *
          </span>
        ) : null}
      </label>
      <textarea
        id={id}
        rows={rows}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "rounded-md border bg-card px-4 py-3 text-base text-ink-950",
          "placeholder:text-ink-300",
          "transition-colors duration-200",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700",
          "resize-y",
          error
            ? "border-error focus-visible:outline-error"
            : "border-ink-300/60",
          className,
        )}
        {...rest}
      />
      {error ? (
        <p id={errorId} className="text-sm text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
