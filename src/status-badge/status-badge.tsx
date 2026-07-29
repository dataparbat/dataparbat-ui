import { cx } from "../cx";

/* Shape carries state alongside color (the colorblind rule): circle =
   healthy, square = wants attention, triangle = failed, ring = waiting. */
type Tone = "ok" | "warn" | "crit" | "idle";

const TONES: Record<string, Tone> = {
  sent: "ok",
  delivered: "ok",
  verified: "ok",
  live: "ok",
  queued: "idle",
  scheduled: "idle",
  sending: "idle",
  pending: "warn",
  suppressed: "warn",
  test: "warn",
  bounced: "crit",
  failed: "crit",
  complained: "crit",
};

export function StatusBadge({ value, tone }: { value: string; tone?: Tone }) {
  const resolved = tone ?? TONES[value] ?? "idle";
  return (
    <span className={cx("dp-status", `dp-${resolved}`)}>
      <span aria-hidden className="dp-dot" />
      {value}
    </span>
  );
}
