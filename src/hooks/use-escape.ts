import { useEffect } from "react";

/* Close-on-Escape, the shared overlay contract. src/hooks holds the kit's
   SHARED MECHANICS — the small, closed set more than one component needs
   (escape, focus, copy). A hook one component owns colocates with that
   component instead; app-level contracts (session, org, registry) belong
   to the console SDK, never here. Exported: consumers building custom
   overlays get the same primitives ours use. */
export function useEscape(active: boolean, onClose: () => void) {
  useEffect(() => {
    if (!active) return;

    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [active, onClose]);
}
