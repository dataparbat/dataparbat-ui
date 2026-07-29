export function Checkbox({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="dp-chk">
      <input type="checkbox" {...props} />
      {label}
    </label>
  );
}
