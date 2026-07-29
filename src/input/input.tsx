import { cx } from "../cx";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cx("dp-in", props.className)} />;
}
