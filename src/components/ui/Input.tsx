import { cn } from "@/lib/utils";

type InputProps = {
  id: string;
  label: string;
  error?: string;
  className?: string;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "id" | "className" | "aria-invalid" | "aria-describedby"
>;

export function Input({
  id,
  label,
  error,
  className,
  required,
  ...rest
}: InputProps) {
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
      <input
        id={id}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "h-11 rounded-md border bg-card px-4 text-base text-ink-950",
          "placeholder:text-ink-300",
          "transition-colors duration-200",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700",
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
