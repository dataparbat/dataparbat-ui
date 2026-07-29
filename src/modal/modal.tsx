import type { ReactNode } from "react";

import { useEscape } from "../hooks/use-escape";

export function Modal({
  open,
  onClose,
  children,
  title,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}) {
  useEscape(open, onClose);

  if (!open) return null;

  return (
    <div className="dp-modal-root">
      <div className="dp-overlay-scrim" onClick={onClose} />
      <div role="dialog" aria-modal aria-label={title} className="dp-modal">
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}
