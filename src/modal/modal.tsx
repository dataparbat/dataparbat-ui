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
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-(--scrim)" onClick={onClose} />
      <div ref={ref} className="relative w-[440px] max-w-full card bg-surface-2 p-5 space-y-4">
        <h2 className="text-[15px] font-semibold">{title}</h2>
        {children}
      </div>
    </div>
  );
}
