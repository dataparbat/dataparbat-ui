import { cx } from "../cx";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cx(
        "h-8 w-full rounded-[2px] bg-surface border border-line-strong px-2.5 font-mono text-[13px] text-ink placeholder:text-ink-3 disabled:opacity-45",
        props.className,
      )}
    />
  );
}
