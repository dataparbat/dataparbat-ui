import { cx } from "../cx";

/* Four-state rule: every data surface renders exactly one of
   skeleton -> error -> empty -> data. Skeletons are LAYOUT-TRUE: same
   columns, same row heights as the data they stand in for, so arrival
   shifts nothing. Width variation lives in CSS (nth-child cycles).
   aria-hidden + a polite live label. */

export function Skeleton({ className = "" }: { className?: string }) {
  return <span aria-hidden className={cx("skeleton dp-skel", className)} />;
}

export function TableSkeleton({
  cols,
  rows = 8,
  loadingLabel = "Loading",
}: {
  cols: number;
  rows?: number;
  loadingLabel?: string;
}) {
  return (
    <div role="status" aria-label={loadingLabel}>
      <table className="dp-table dp-skel-table" aria-hidden>
        <tbody>
          {Array.from({ length: rows }, (_, row) => (
            <tr key={row}>
              {Array.from({ length: cols }, (_, col) => (
                <td key={col}>
                  <Skeleton className="dp-skel-line" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CardSkeleton({
  lines = 3,
  className = "",
  loadingLabel = "Loading",
}: {
  lines?: number;
  className?: string;
  loadingLabel?: string;
}) {
  return (
    <div
      role="status"
      aria-label={loadingLabel}
      className={cx("card dp-skel-card", className)}
    >
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton key={index} className="dp-skel-line" />
      ))}
    </div>
  );
}
