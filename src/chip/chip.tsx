import { cx } from "../cx";

export function Chip({
  k,
  v,
  state,
}: {
  k: string;
  v: string;
  state?: "live" | "test" | "preview" | "plain";
}) {
  return (
    <span className={cx("dp-chip", state && `dp-${state}`)}>
      <span className="dp-ck">{k}:</span>
      <span className="dp-cv">{v}</span>
    </span>
  );
}
