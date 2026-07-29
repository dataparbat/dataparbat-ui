import type { ReactNode } from "react";

import { useEscape } from "../use-escape";

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
  useEscape(open, onClose);

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
