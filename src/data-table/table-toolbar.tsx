import { useRef, useState, type ReactNode } from "react";

import { cx } from "../cx";
import { useClickOutside } from "../hooks/use-click-outside";
import { useEscape } from "../hooks/use-escape";
import { DotsIcon, SearchIcon } from "../icons/icons";

/* The table toolbar — conventional on purpose (canvas F): search scoped by
   its placeholder, a Filter button, applied filters as removable key:value
   tokens anyone can read, an overflow menu for view-level actions. */

export function TableToolbar({ children }: { children: ReactNode }) {
  return <div className="dp-qbar">{children}</div>;
}

export function ToolbarSpacer() {
  return <span className="dp-spacer" />;
}

export function SearchBox({
  value,
  onChange,
  placeholder,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
}) {
  return (
    <label className="dp-sbox">
      <SearchIcon />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={label}
      />
    </label>
  );
}

export function FilterToken({
  k,
  v,
  tone,
  onRemove,
  removeLabel,
}: {
  k: string;
  v: string;
  tone?: "warn";
  onRemove: () => void;
  removeLabel: string;
}) {
  return (
    <span className={cx("dp-qtok", tone === "warn" && "dp-warn")}>
      <span className="dp-qk">{k}:</span>
      <span className="dp-qv">{v}</span>
      <button type="button" className="dp-qx" aria-label={removeLabel} onClick={onRemove}>
        ×
      </button>
    </span>
  );
}

export function IconButton({
  label,
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button type="button" className={cx("dp-iconbtn", className)} aria-label={label} {...props}>
      {children}
    </button>
  );
}

/* the ⋯ menu: view-level actions live here, never as row clutter */
export function OverflowMenu({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, open, () => setOpen(false));
  useEscape(open, () => setOpen(false));

  return (
    <div className="dp-rowmenu" ref={ref}>
      <IconButton label={label} aria-expanded={open} onClick={() => setOpen(!open)}>
        <DotsIcon />
      </IconButton>
      {open && (
        <div role="menu" className="dp-menu" onClick={() => setOpen(false)}>
          {children}
        </div>
      )}
    </div>
  );
}

export function MenuItem({
  children,
  shortcut,
  tone,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  shortcut?: string;
  tone?: "crit";
}) {
  return (
    <button
      type="button"
      role="menuitem"
      className={cx("dp-mi", tone === "crit" && "dp-crit")}
      {...props}
    >
      {children}
      {shortcut && <span className="dp-mk">{shortcut}</span>}
    </button>
  );
}

export function MenuDivider() {
  return <hr />;
}
