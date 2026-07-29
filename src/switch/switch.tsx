export function Switch({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="dp-swrow">
      <span className="dp-sw">
        <input type="checkbox" role="switch" {...props} />
      </span>
      {label}
    </label>
  );
}
