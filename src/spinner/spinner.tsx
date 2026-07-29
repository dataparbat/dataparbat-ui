export function Spinner({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`dp-spinner ${className}`} />;
}
