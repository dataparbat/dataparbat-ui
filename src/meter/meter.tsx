import { cx } from "../cx";

/* Ruling 29. Native <progress>: the fill needs no inline style and the
   semantics come free. */
export function Meter({
  value,
  max,
  tone,
  label,
}: {
  value: number;
  max: number;
  tone?: "warn";
  label: string;
}) {
  return (
    <progress
      className={cx("dp-meter", tone && `dp-${tone}`)}
      value={value}
      max={max}
      aria-label={label}
    />
  );
}
