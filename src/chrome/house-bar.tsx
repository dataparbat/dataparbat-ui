import { useRef, useState, type ReactNode } from "react";

import { Badge } from "../badge/badge";
import { StatusBadge } from "../status-badge/status-badge";
import { useClickOutside } from "../hooks/use-click-outside";
import { useEscape } from "../hooks/use-escape";
import type { AccountMenuItem, ChromeLabels, ProductEntry, Viewer } from "./types";

/* THE HOUSE BAR (canvas C): one row, two zones, shared by the console and
   every product SPA. The chrome knows NOTHING about apps: labels arrive as
   a dictionary, the wordmark arrives as a slot (the console renders a
   router Link; a product SPA renders a document anchor back to the
   console), and every action is a callback. */

export function HouseBar({
  homeSlot,
  products,
  activeSlug,
  currentWorkspace,
  workspaceSwitcher,
  viewer,
  accountItems,
  labels,
  onSwitchProduct,
  onBrowseAll,
  onAccountNavigate,
  onSignOut,
}: {
  homeSlot: ReactNode;
  products: ProductEntry[];
  activeSlug?: string;
  currentWorkspace: string;
  workspaceSwitcher: ReactNode;
  viewer: Viewer;
  accountItems: AccountMenuItem[];
  labels: ChromeLabels;
  onSwitchProduct: (slug: string) => void;
  onBrowseAll: () => void;
  onAccountNavigate: (path: string) => void;
  onSignOut: () => void;
}) {
  const active = products.find((product) => product.slug === activeSlug);
  void currentWorkspace;

  return (
    <div className="dp-hbar">
      <div className="dp-hzone">
        {homeSlot}
        {active && (
          <ProductSwitcher
            products={products}
            active={active}
            labels={labels}
            onSwitch={onSwitchProduct}
            onBrowseAll={onBrowseAll}
          />
        )}
        <span className="dp-vr" />
        {workspaceSwitcher}
      </div>
      <div className="dp-pzone">
        <button type="button" className="dp-hlink">
          {labels.docs}
        </button>
        <button type="button" className="dp-hlink">
          {labels.support}
        </button>
        <span className="dp-kbd">⌘K</span>
        <AccountMenu
          viewer={viewer}
          items={accountItems}
          labels={labels}
          onNavigate={onAccountNavigate}
          onSignOut={onSignOut}
        />
      </div>
    </div>
  );
}

function ProductSwitcher({
  products,
  active,
  labels,
  onSwitch,
  onBrowseAll,
}: {
  products: ProductEntry[];
  active: ProductEntry;
  labels: ChromeLabels;
  onSwitch: (slug: string) => void;
  onBrowseAll: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, open, () => setOpen(false));
  useEscape(open, () => setOpen(false));

  const enabled = products.filter((product) => product.enabled);
  const available = products.filter((product) => !product.enabled);

  return (
    <div className="dp-psw-wrap" ref={ref}>
      <button
        type="button"
        className="dp-psw"
        aria-expanded={open}
        aria-label={labels.switchProduct}
        onClick={() => setOpen(!open)}
      >
        <span className="dp-sep" aria-hidden>
          ▸
        </span>
        {active.name}
        <span className="dp-caret" aria-hidden>
          ▾
        </span>
      </button>
      {open && (
        <div role="menu" aria-label={labels.switchProduct} className="dp-shellpop">
          <div className="dp-grp">{labels.groupEnabled}</div>
          {enabled.map((product) => (
            <SwitcherItem
              key={product.slug}
              product={product}
              current={product.slug === active.slug}
              onSelect={() => {
                setOpen(false);
                onSwitch(product.slug);
              }}
            />
          ))}
          <div className="dp-grp">{labels.groupAvailable}</div>
          {available.map((product) => (
            <SwitcherItem
              key={product.slug}
              product={product}
              current={false}
              onSelect={() => {
                setOpen(false);
                onSwitch(product.slug);
              }}
            />
          ))}
          <hr />
          <div className="dp-foot">
            <button type="button" className="dp-link dp-hlink" onClick={onBrowseAll}>
              {labels.browseProducts}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SwitcherItem({
  product,
  current,
  onSelect,
}: {
  product: ProductEntry;
  current: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      className={product.accessible ? "dp-mi" : "dp-mi dp-dis"}
      aria-current={current || undefined}
      onClick={onSelect}
    >
      <span>
        <span className="dp-mt">{product.name}</span>
        <span className="dp-ms">{product.descriptor}</span>
      </span>
      <span className="dp-sp" />
      {current ? (
        <StatusBadge value="live" tone="ok" />
      ) : (
        product.badge && <Badge tone={product.badge}>{badgeLabel(product.badge)}</Badge>
      )}
    </button>
  );
}

function badgeLabel(badge: NonNullable<ProductEntry["badge"]>) {
  return { ga: "GA", prev: "Preview", internal: "Internal", sunset: "Sunset" }[badge];
}

/* the staff marker (ruling 47): loud, above everything, audited */
export function StaffBar({ labels, onLeave }: { labels: ChromeLabels; onLeave: () => void }) {
  return (
    <div className="dp-staffbar">
      <span className="dp-sq" aria-hidden />
      <span>{labels.staffBanner}</span>
      <span className="dp-sp" />
      <button type="button" className="dp-staff-leave" onClick={onLeave}>
        {labels.staffLeave}
      </button>
    </div>
  );
}

/* the account menu: shell-owned account surfaces hang off the avatar; the
   ITEM LIST arrives from the app (a product SPA points these at the
   console origin, document navigation) */
function AccountMenu({
  viewer,
  items,
  labels,
  onNavigate,
  onSignOut,
}: {
  viewer: Viewer;
  items: AccountMenuItem[];
  labels: ChromeLabels;
  onNavigate: (path: string) => void;
  onSignOut: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, open, () => setOpen(false));
  useEscape(open, () => setOpen(false));

  return (
    <div className="dp-psw-wrap" ref={ref}>
      <button
        type="button"
        className="dp-avatar"
        aria-label={labels.accountMenu}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {viewer.initials}
      </button>
      {open && (
        <div role="menu" aria-label={labels.accountMenu} className="dp-shellpop dp-narrow dp-right">
          {items.map((item) => (
            <button
              key={item.path}
              type="button"
              role="menuitem"
              className="dp-mi"
              onClick={() => {
                setOpen(false);
                onNavigate(item.path);
              }}
            >
              <span className="dp-mt">{item.label}</span>
            </button>
          ))}
          <hr />
          <button
            type="button"
            role="menuitem"
            className="dp-mi"
            onClick={() => {
              setOpen(false);
              onSignOut();
            }}
          >
            <span className="dp-mt">{labels.signOut}</span>
          </button>
        </div>
      )}
    </div>
  );
}
