import { useState } from "react";

export function CopyButton({
  text,
  label = "copy",
  copiedLabel = "copied",
}: {
  text: string;
  label?: string;
  copiedLabel?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="text-[11px] text-ink-3 hover:text-accent transition-colors data"
      onClick={() => {
        void navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
