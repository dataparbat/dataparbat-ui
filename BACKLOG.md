# dataparbat-ui — kit-vs-canvas audit (2026-07-29)

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

- [ ] **DataTable** — THE brand surface, biggest gap. Fixed 34px rows,
      cells never wrap, one line per row; secondary facts as dim mono
      suffix behind a middot — NEVER boxed badges inside cells (headers and
      detail panes only). Column roles with declared bounds (c-name 180–340,
      c-sub 150–280, c-id 132 mono, c-status 132, c-kind 104, c-time 76
      right mono tabular, c-num 88 right, c-act 1%). Row states: hover
      quiet-hover, focus ring drawn INSIDE (-2 offset), selection
      accent-wash + first-cell 550 (warn/crit rows keep their wash). Sort
      headers: lowercase mono, direction arrow in accent-ink, always shown
      (ruling 43). `.nil` voice for absent values. Footer: honest count,
      cursor paging ("load more"), never fake page numbers.
- [ ] **TableToolbar** — conventional on purpose: 28px search box scoped
      placeholder, `Filter` button, applied filters as removable key:value
      tokens (`mode: test ×`), overflow icon-button menu. 44px min height.
- [ ] **WireHeader** — the signature idiom: lowercase mono key:value
      eyebrow with the 14px dash. One per surface, exactly.
- [ ] **Chip (wchip)** — key:value mode chips: mono 10.5, split key/value
      cells, state dot (live=accent circle, test=warn square,
      preview=dashed border + ring dot).
- [ ] **Checkbox / Radio / Switch** — 15px controls, 2px/50% radius,
      accent checked states, drawn glyphs (no native appearance); switch
      32×18, 12px knob, 120ms.
- [ ] **SegmentedControl** — 26–28px, mono labels, live/test pressed
      washes (accent-wash / warn-wash).
- [ ] **Toast** — min-height 44px, surface + line-strong + overlay-shadow,
      mono counter slot.
- [ ] **Tooltip** — ink-on-ink-inverse (p-ink bg, p-bg text), 11.5px, 7px
      offset; also the `gated` pattern (ruling 6): a role-gated control is
      VISIBLE, disabled, reason attached on hover/focus-within.
- [ ] **Banner** — inline page-level notice, warn variant.
- [ ] **Kbd** — mono 11, bottom-heavy border.
- [ ] **Meter** — 5px bar, viz-ghost track, accent fill, warn variant
      (ruling 29).
- [ ] **CommandPalette** — 560px, grouped items, inset 2px accent bar on
      active row, ⌘K affordance.
- [ ] **Link** — body link: accent-ink, underline offset 2, thickness 1→2
      on hover; quiet link: ink, underline on hover only.
- [ ] **Badge (lifecycle)** — GA/Preview/Internal/Sunset treatments (mono
      10, wash + border in the semantic family; internal uses staff family).
- [ ] **Icons** — 16px grid, 1.5 stroke, square caps, miter joins, fill
      none. Establish the set with search/dots/close first.

## 4. Explicit non-goals (shell furniture stays in the console app)

House bar, product/org switchers, staff bar, rail nav, product catalog
rows, attach offers, key-grant tiers: console-owned compositions of kit
primitives (CONSOLE.md boundary). Promote to the kit only when a second
consumer exists.

## 5. Consumers

- legacy-app + www: PINNED to the pre-migration kit (git SHA / lockfile) —
  they stay on the old language until the website redesign; do not chase.
- First consumer of the migrated kit: the console build. Blocked on §1–§3.
