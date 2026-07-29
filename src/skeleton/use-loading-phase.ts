import { useEffect, useState } from "react";

/* Owned by the skeleton family (ruling 59): a data surface shows its
   skeleton for AT LEAST minShowMs — on every mount AND on every identity
   change (workspace switch, product switch: pass the identity as resetKey)
   — and for as long as the fetch actually takes beyond that. Background
   refetches after mutations never re-arm the floor: cached data stays up,
   so pending never rises. Loading is one consistent gesture; there is no
   invisible fast path. */
export function useLoadingPhase(
  pending: boolean,
  minShowMs = 400,
  resetKey?: unknown,
): boolean {
  const [floorPassed, setFloorPassed] = useState(false);

  useEffect(() => {
    setFloorPassed(false);
    const timer = setTimeout(() => setFloorPassed(true), minShowMs);

    return () => clearTimeout(timer);
  }, [minShowMs, resetKey]);

  return pending || !floorPassed;
}
