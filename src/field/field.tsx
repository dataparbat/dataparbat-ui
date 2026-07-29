import type { ReactNode } from "react";

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="dp-field">
      <span className="dp-label">{label}</span>
      {children}
      {hint && <span className="dp-hint">{hint}</span>}
    </label>
  );
}
