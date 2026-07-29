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
      className="dp-copy"
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
