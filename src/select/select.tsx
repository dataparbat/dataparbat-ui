import { cx } from "../cx";

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cx("dp-in", props.className)} />;
}
