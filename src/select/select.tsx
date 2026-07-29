import { cx } from "../cx";

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cx(
        "h-8 rounded-[2px] bg-surface border border-line-strong px-2 text-[13px] text-ink disabled:opacity-45",
        props.className,
      )}
    />
  );
}
