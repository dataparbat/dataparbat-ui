import type { ReactNode } from "react";

/* The teaching empty is a telegram (canvas F): a display heading, one short
   balanced line, ONE primary action, a single-line mono fine print. */
export function EmptyState({
  title,
  hint,
  action,
  fine,
}: {
  title: string;
  hint?: string;
  action?: ReactNode;
  fine?: string;
}) {
  return (
    <div className="dp-empty">
      <h3>{title}</h3>
      {hint && <p>{hint}</p>}
      {action}
      {fine && <div className="dp-fine">{fine}</div>}
    </div>
  );
}
