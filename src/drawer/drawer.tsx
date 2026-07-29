import { useEffect, type ReactNode } from "react";

export function Drawer({
  open,
  onClose,
  children,
  title,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title: ReactNode;
}) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40">
      <div className="absolute inset-0 bg-(--scrim)" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-[560px] max-w-[92vw] bg-surface-2 border-l border-line-strong flex flex-col">
        <header className="flex items-center justify-between px-5 h-14 border-b border-line shrink-0">
          <div className="min-w-0">{title}</div>
          <button
            className="text-ink-3 hover:text-ink text-lg leading-none px-1"
            onClick={onClose}
          >
            ×
          </button>
        </header>
        <div className="overflow-y-auto flex-1 p-5">{children}</div>
      </aside>
    </div>
  );
}
