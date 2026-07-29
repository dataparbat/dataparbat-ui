export function Radio({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="dp-rad">
      <input type="radio" {...props} />
      {label}
    </label>
  );
}
