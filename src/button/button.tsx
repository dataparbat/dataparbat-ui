import { cx } from "../cx";

/* The instrument chassis: near-square, a breath of height, tracked label.
   Six states — rest, hover, active (a half-pixel settle), focus (the global
   accent ring), disabled, loading. The craft lives in the states. */
export function Button({
  kind = "default",
  loading = false,
  className,
  children,
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  kind?: "primary" | "default" | "danger" | "ghost";
  loading?: boolean;
}) {
  const kinds = {
    primary:
      "bg-accent text-on-accent border border-transparent hover:bg-accent-hover active:bg-accent-down disabled:hover:bg-accent",
    default:
      "bg-surface border border-line-strong text-ink hover:bg-quiet-hover active:bg-quiet-down disabled:hover:bg-surface",
    danger:
      "bg-surface border border-line-strong text-crit hover:bg-crit-wash hover:border-crit active:bg-crit-wash",
    ghost:
      "text-ink-2 border border-transparent hover:text-ink hover:bg-quiet-hover active:bg-quiet-down",
  };
  return (
    <button
      className={cx(
        "inline-flex items-center gap-1.5 rounded-[2px] px-4 py-[9px] text-[13px]/none font-medium tracking-[0.02em] transition-colors active:translate-y-[0.5px] disabled:opacity-45 disabled:cursor-not-allowed disabled:active:translate-y-0 select-none",
        kinds[kind],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span
          aria-hidden
          className="size-[11px] rounded-full border-[1.5px] border-current border-t-transparent animate-spin"
        />
      )}
      {children}
    </button>
  );
}
