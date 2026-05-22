import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonBaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLinkProps = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type ButtonAsButtonProps = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-xl font-sans font-semibold tracking-tight " +
  "transition duration-200 ease-out " +
  "hover:scale-[1.02] active:scale-[0.98] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-700 " +
  "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50";

const SIZE_CLASSES: Record<Size, string> = {
  sm: "h-9 px-5 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-[52px] px-8 text-base",
};

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-mint-500 text-ink-950 hover:bg-mint-700",
  secondary:
    "border border-ink-950 bg-transparent text-ink-950 hover:bg-ink-950 hover:text-ink-50",
  ghost: "bg-transparent text-ink-950 hover:bg-ink-950/5",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    BASE_CLASSES,
    SIZE_CLASSES[size],
    VARIANT_CLASSES[variant],
    className,
  );

  if ("href" in props && props.href) {
    const anchorRest = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  const buttonRest = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  );
}
