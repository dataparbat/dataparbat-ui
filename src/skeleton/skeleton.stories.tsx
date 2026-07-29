import { CardSkeleton, Skeleton, TableSkeleton } from "./skeleton";

export const TableLoading = () => (
  <div className="story-pad">
    <TableSkeleton cols={5} rows={6} loadingLabel="Loading" />
  </div>
);

export const CardLoading = () => (
  <div className="story-pad story-narrow">
    <CardSkeleton lines={4} loadingLabel="Loading" />
  </div>
);

export const InlineSkeleton = () => (
  <div className="story-pad story-stack">
    <Skeleton className="dp-skel-line story-w-lg" />
    <Skeleton className="dp-skel-line story-w-md" />
  </div>
);
