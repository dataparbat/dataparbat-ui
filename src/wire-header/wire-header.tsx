import type { ReactNode } from "react";

/* The signature idiom: a lowercase mono key:value eyebrow — the RFC-5322
   voice. Exactly one per surface. Values render through <WireValue>. */
export function WireHeader({ children }: { children: ReactNode }) {
  return <span className="dp-wire">{children}</span>;
}

export function WireValue({ children }: { children: ReactNode }) {
  return <b>{children}</b>;
}
