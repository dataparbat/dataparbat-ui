import type { ReactNode } from "react";

export function Tooltip({
  content,
  children,
  underline = false,
}: {
  content: ReactNode;
  children: ReactNode;
  underline?: boolean;
}) {
  return (
    <span className="dp-tipwrap" tabIndex={0}>
      <span className={underline ? "dp-hoverable" : undefined}>{children}</span>
      <span role="tooltip" className="dp-tip">
        {content}
      </span>
    </span>
  );
}

/* Ruling 6: a role-gated control is VISIBLE, disabled, reason attached —
   never hidden, never silently inert. */
export function Gated({ reason, children }: { reason: ReactNode; children: ReactNode }) {
  return (
    <span className="dp-tipwrap">
      {children}
      <span role="tooltip" className="dp-tip">
        {reason}
      </span>
    </span>
  );
}
