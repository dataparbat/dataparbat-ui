import { cx } from "../cx";

/* Shape carries state alongside color, so a colorblind reader keeps every
   distinction: circle = healthy, square = wants attention, triangle =
   failed, ring = waiting its turn. Color comes from the semantic families
   (accent doubles as the healthy family by design). */
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

const TONE_TEXT: Record<Tone, string> = {
  ok: "text-accent-ink",
  warn: "text-warn",
  crit: "text-crit",
  idle: "text-ink-2",
};

function Glyph({ tone }: { tone: Tone }) {
  if (tone === "crit")
    return (
      <span
        aria-hidden
        className="inline-block size-0 border-x-[5px] border-x-transparent border-b-[8px] border-b-crit"
      />
    );
  if (tone === "warn")
    return <span aria-hidden className="inline-block size-[7px] rounded-[1px] bg-warn" />;
  if (tone === "idle")
    return (
      <span
        aria-hidden
        className="inline-block size-[7px] rounded-full border-[1.5px] border-viz-neutral"
      />
    );
  return <span aria-hidden className="inline-block size-[7px] rounded-full bg-accent" />;
}

export function StatusBadge({ value, tone }: { value: string; tone?: Tone }) {
  const resolved = tone ?? TONES[value] ?? "idle";
  return (
    <span
      className={cx(
        "inline-flex items-center gap-[7px] text-[12.5px] lowercase",
        TONE_TEXT[resolved],
      )}
    >
      <Glyph tone={resolved} />
      {value}
    </span>
  );
}
