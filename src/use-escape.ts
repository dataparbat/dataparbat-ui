import { useEffect } from "react";

/* Close-on-Escape, the shared overlay contract. Effect logic lives in named
   hooks in their own files — the extraction instinct, hook-shaped — so a
   component's top reads as a table of contents. */
export function useEscape(active: boolean, onClose: () => void) {
  useEffect(() => {
    if (!active) return;

    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [active, onClose]);
}
