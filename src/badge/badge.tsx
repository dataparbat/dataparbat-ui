import { cx } from "../cx";

/* Lifecycle badges (canvas C). Boxes belong in headers and detail panes —
   inside a table cell, use Sfx instead. */
export function Badge({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone?: "ga" | "prev" | "internal" | "sunset";
}) {
  return <span className={cx("dp-badge", tone && `dp-${tone}`)}>{children}</span>;
}
