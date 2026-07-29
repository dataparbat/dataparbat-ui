import { useEffect, useState } from "react";

/* Owned by the skeleton family (ruling 59): a data surface shows its
   skeleton for AT LEAST minShowMs on every mount — even when the query
   settles instantly — and for as long as the fetch actually takes beyond
   that. A page that sometimes paints instantly and sometimes shows a
   skeleton reads as two different products; the floor makes loading one
   consistent gesture. */
export function useLoadingPhase(pending: boolean, minShowMs = 400): boolean {
  const [floorPassed, setFloorPassed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFloorPassed(true), minShowMs);

    return () => clearTimeout(timer);
  }, [minShowMs]);

  return pending || !floorPassed;
}
