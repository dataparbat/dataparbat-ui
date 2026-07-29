import type { ReactNode } from "react";

import { cx } from "../cx";

/* Tabs idiom: title above, underline tab row, accent underline on active, one
   full-width hairline under the row. Proper tablist semantics. */

export function Tabs<T extends string>({
  tabs,
  active,
  onChange,
  label,
  idPrefix,
}: {
  tabs: { id: T; label: () => string }[];
  active: T;
  onChange: (tab: T) => void;
  label: string;
  idPrefix: string;
}) {
  return (
    <div role="tablist" aria-label={label} className="relative flex gap-1 mb-5">
      {/* ONE continuous hairline under the whole row — never per-tab bars. */}
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-line" />
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          id={`${idPrefix}-tab-${tab.id}`}
          aria-selected={active === tab.id}
          aria-controls={`${idPrefix}-panel-${tab.id}`}
          tabIndex={active === tab.id ? 0 : -1}
          onClick={() => onChange(tab.id)}
          onKeyDown={(event) => {
            const index = tabs.findIndex((entry) => entry.id === active);
            if (event.key === "ArrowRight") onChange(tabs[(index + 1) % tabs.length].id);
            if (event.key === "ArrowLeft")
              onChange(tabs[(index - 1 + tabs.length) % tabs.length].id);
          }}
          className={cx(
            "relative px-3 py-2 text-[13px] transition-colors",
            active === tab.id
              ? "text-ink font-medium after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-accent"
              : "text-ink-2 hover:text-ink",
          )}
        >
          {tab.label()}
        </button>
      ))}
    </div>
  );
}

export function TabPanel({
  idPrefix,
  tab,
  children,
  className = "",
}: {
  idPrefix: string;
  tab: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="tabpanel"
      id={`${idPrefix}-panel-${tab}`}
      aria-labelledby={`${idPrefix}-tab-${tab}`}
      className={className}
    >
      {children}
    </div>
  );
}
