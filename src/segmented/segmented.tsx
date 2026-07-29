import { cx } from "../cx";

/* Mode switcher (canvas C): the pressed wash carries the semantics —
   live = accent, test = warn. */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { id: T; label: string; tone?: "test" }[];
  value: T;
  onChange: (id: T) => void;
  label: string;
}) {
  return (
    <div className="dp-seg" role="group" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          className={cx(option.tone === "test" && "dp-test")}
          aria-pressed={value === option.id}
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
