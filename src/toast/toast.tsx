import type { ReactNode } from "react";

/* The artifact only — queueing/positioning is the app's job. */
export function Toast({ children, count }: { children: ReactNode; count?: string }) {
  return (
    <div role="status" className="dp-toast">
      {children}
      {count && <span className="dp-count">{count}</span>}
    </div>
  );
}
