# dataparbat-ui — kit-vs-canvas audit (2026-07-29)

**Styling ruling (2026-07-29, his):** the kit owns its styling — plain CSS,
no Tailwind, no SCSS, no inline style attributes. Per-component colocated
.css files behind one aggregating ui.css entry; dp-prefixed canvas class
names so every treatment traces to the locked canvases; tokens (custom
properties) remain the only theming API. Dependencies only where we cannot
own the thing (the SES rule) — styling is ownable.

Audited against the locked Foundation (F, v15) and Console (C, rev 8)
canvases + the rulings they bake in. The kit's ARCHITECTURE survives (token
contract, neutral defaults, strings-as-props, a11y); its VOCABULARY and
component inventory predate the canvases. Console build must not start
until §1–§3 land.

## 1. Token contract migration (breaking, do first)

The kit speaks the retired single-layer dark-first contract
(`--color-bg/-raised/-overlay/-inset/-edge/-ink/-brand/...`). Foundation
v15 is TWO-LAYER and light-first:

- Layer 1 house chrome: `--h-bg/-surface/-ink/-ink-2/-ink-3/-line/-hover/-down`,
  `--staff/-wash/-ink`, `--scrim`, `--overlay-shadow`
- Layer 2 product: `--p-bg/-surface/-surface-2/-ink/-ink-2/-ink-3/-line/-line-strong`,
  `--accent/-hover/-down/-ink/-wash`, `--on-accent`, `--quiet-hover/-down`,
  `--warn/-wash`, `--crit/-wash`, `--viz-1..5/-neutral/-ghost`
- Type: `--f-display/-ui/-mono` (three families, not two)
- Geometry: `--r-s:3px --r-m:6px`, controls at 2px; spacing `--s1..s7`;
  `--dur:120ms`; breakpoints `--bp-rail:1240px --bp-min:920px`

Tasks:
- [x] Rewrite every component against the new names; delete the old contract. (2026-07-29)
- [x] `default-theme.css` re-derived: neutral, new vocabulary, light-first,
      dark via media query AND `[data-theme]`. (2026-07-29)
- [x] Real values live in `@dataparbat/theme`, now in the kit's contract
      namespace. Kit never imports it. (2026-07-29)
- [ ] Fonts: theme owns the @font-face for Schibsted Grotesk / Instrument
      Sans / Commit Mono (all OFL, self-hosted). Kit keeps system stacks in
      its neutral default.

## 2. Existing components — align to canvas treatments

- [x] **Button** — instrument chassis, six states incl. loading spinner. (2026-07-29)
- [x] **StatusBadge** — four glyph shapes carry state beside color. (2026-07-29)
- [ ] **Tabs** — 2px accent underline on selected, 550 weight, ink-3 rest,
      -1px margin trick; focus ring 2px radius.
- [x] **Skeleton** — opacity-only pulse, reduced-motion kill. (2026-07-29)
- [ ] **EmptyState** — the teaching empty: table keeps its own header row,
      body is the telegram (20px display heading, ≤42ch balanced copy, ONE
      primary action + one quiet underlined link, single-line mono fine
      print). Terminal fragment (`.term`) as an optional slot.
- [ ] **ErrorState** — inline error: 12.5px crit with the triangle glyph
      ::before; banner variant: warn border + wash. Field error: crit input
      border + accent focus ring still.
- [ ] **Input/Select/Field** — mono 13 input text, 2px radius,
      line-strong border, accent focus ring 1.5px offset 2, disabled .45;
      select with the double-triangle chevron (no appearance).
- [ ] **Modal/Drawer** — one scrim (`--scrim`), one shadow
      (`--overlay-shadow`), one hairline; never stacked. Dialog: 6px
      radius, display-face 16px title.
- [ ] **Spinner** — 1.5px ring, currentColor top-transparent, .7s linear.
- [ ] **CopyButton** — IDs middle-truncate in mono and copy on click.

## 3. Missing components the canvases require (console blockers)

- [x] **DataTable** — built 2026-07-29 (`src/data-table/`): column roles, 34px rows, suffix idiom, sort/selection/focus rules, warn/crit rows, honest footer, Nil voice.
- [x] **TableToolbar** — built 2026-07-29: search box, filter tokens, icon button, overflow menu (click-outside + escape via shared hooks).
- [x] **WireHeader** — `src/wire-header/`. (2026-07-29)
- [x] **Chip** — `src/chip/`, live/test/preview/plain states. (2026-07-29)
- [x] **Checkbox / Radio / Switch** — drawn 15px controls, 32×18 switch. (2026-07-29)
- [x] **SegmentedControl** — live/test pressed washes. (2026-07-29)
- [x] **Toast** — the artifact; queueing is the app's. (2026-07-29)
- [x] **Tooltip + Gated** — incl. the ruling-6 pattern. (2026-07-29)
- [x] **Banner** — note/warn. (2026-07-29)
- [x] **Kbd** — `.dp-kbd` in base. (2026-07-29)
- [x] **Meter** — native <progress>, no inline styles. (2026-07-29)
- [x] **CommandPalette** — presentational, listbox semantics. (2026-07-29)
- [x] **Link** — a.dp-link / a.dp-quiet-link in base. (2026-07-29)
- [x] **Badge** — GA/Preview/Internal/Sunset. (2026-07-29)
- [x] **Icons** — grammar established (`src/icons/`): search/dots/close. (2026-07-29)

## 4. Explicit non-goals (shell furniture stays in the console app)

House bar, product/org switchers, staff bar, rail nav, product catalog
rows, attach offers, key-grant tiers: console-owned compositions of kit
primitives (CONSOLE.md boundary). Promote to the kit only when a second
consumer exists.

## 5. Consumers

- legacy-app + www: PINNED to the pre-migration kit (git SHA / lockfile) —
  they stay on the old language until the website redesign; do not chase.
- First consumer of the migrated kit: the console build. Blocked on §1–§3.
