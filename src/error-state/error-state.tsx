import { Button } from "../button/button";

/** Recoverable in place — dead-end errors are banned. */
export function ErrorState({
  error,
  onRetry,
  retryLabel = "Retry",
}: {
  error: unknown;
  onRetry?: () => void;
  retryLabel?: string;
}) {
  const detail = error instanceof Error ? error.message : String(error);
  return (
    <div role="alert" className="py-12 text-center space-y-3">
      <p className="text-[13px] text-crit">{detail}</p>
      {onRetry && (
        <Button kind="default" onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
