import { cx } from "../cx";

/* The instrument chassis: six states — rest, hover, active (a half-pixel
   settle), focus (the global accent ring), disabled, loading. Treatments
   live in ui.css (.dp-btn), ported verbatim from the Foundation canvas. */
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
  return (
    <button
      className={cx(
        "dp-btn",
        kind !== "default" && `dp-${kind}`,
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span aria-hidden className="dp-spin" />}
      {children}
    </button>
  );
}
