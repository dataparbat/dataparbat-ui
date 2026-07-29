import { useEffect, useRef, type ReactNode } from "react";

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
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="dp-modal-root">
      <div className="dp-overlay-scrim" onClick={onClose} />
      <div ref={ref} role="dialog" aria-modal aria-label={title} className="dp-modal">
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}
