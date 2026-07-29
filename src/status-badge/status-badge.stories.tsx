import { StatusBadge } from "..";

const STATUSES = [
  "sent", "delivered", "queued", "sending", "bounced",
  "failed", "complained", "suppressed", "verified", "pending", "live", "test",
];

export const AllStatuses = () => (
  <div className="story-pad story-row story-wrap">
    {STATUSES.map((status) => (
      <StatusBadge key={status} value={status} />
    ))}
  </div>
);
