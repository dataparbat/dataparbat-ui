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
    <label className="block space-y-1.5">
      <span className="text-[12px] font-medium text-ink-2">{label}</span>
      {children}
      {hint && <span className="block text-[11.5px] text-ink-3">{hint}</span>}
    </label>
  );
}
