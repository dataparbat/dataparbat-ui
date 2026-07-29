import type { ReactNode } from "react";

export function EmptyState({
  title,
  hint,
  action,
}: {
  title: string;
  hint?: string;
  action?: ReactNode;
}) {
  return (
    <div className="py-16 text-center space-y-2">
      <p className="text-ink-2 text-[14px]">{title}</p>
      {hint && <p className="text-ink-3 text-[12.5px] max-w-md mx-auto">{hint}</p>}
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
