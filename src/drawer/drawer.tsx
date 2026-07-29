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
    <div className="dp-drawer-root">
      <div className="dp-overlay-scrim" onClick={onClose} />
      <aside className="dp-drawer">
        <header>
          <div className="dp-drawer-title">{title}</div>
          <button className="dp-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>
        <div className="dp-drawer-body">{children}</div>
      </aside>
    </div>
  );
}
