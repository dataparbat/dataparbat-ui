import type { ReactNode } from "react";

import { SearchIcon } from "../icons/icons";

/* Presentational palette (canvas F): the shell owns opening, routing and
   the active-item state; this renders the artifact with listbox semantics. */
export function CommandPalette({
  query,
  onQueryChange,
  placeholder,
  label,
  children,
}: {
  query: string;
  onQueryChange: (query: string) => void;
  placeholder: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="dp-cmdk">
      <div className="dp-cin">
        <SearchIcon />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={placeholder}
          aria-label={label}
        />
      </div>
      <div role="listbox" aria-label={label}>
        {children}
      </div>
    </div>
  );
}

export function PaletteGroup({ label }: { label: string }) {
  return <div className="dp-cgrp">{label}</div>;
}

export function PaletteItem({
  children,
  shortcut,
  active = false,
  onSelect,
}: {
  children: ReactNode;
  shortcut?: string;
  active?: boolean;
  onSelect: () => void;
}) {
  return (
    <button type="button" role="option" aria-selected={active} className="dp-ci" onClick={onSelect}>
      {children}
      {shortcut && <span className="dp-cik">{shortcut}</span>}
    </button>
  );
}
