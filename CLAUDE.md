# @dataparbat/ui — kit doctrine

The design system for data-dense developer tools. Treatments port VERBATIM
from the locked canvases (F Foundation v15, C Console rev 8) — every rule
must be traceable to a canvas or the rulings ledger
(`../sendzila/docs/dashboard-design-decisions.md`). Build queue: BACKLOG.md.

## Styling (ruled 2026-07-29)

- PLAIN CSS only. No Tailwind, no SCSS, no CSS-in-JS, no inline `style`
  attributes ever (dynamic variation via nth-child cycles or data-attrs).
- Per-component colocated `.css` files; `src/ui.css` is the single
  aggregating entry; `src/base.css` holds the shared floor.
- Classes are `dp-`prefixed canvas names.
- Tokens (`--color-*`, `--font-*`, `--radius-*`) are the ONLY theming API.
  The kit ships NEUTRAL values (`default-theme.css`); real values live in
  `@dataparbat/theme` (dataparbat repo) — two layers: `h-*` house chrome
  constant, unprefixed product layer + accent pack per product. The kit
  never imports a theme.
- Light-first; dark pairs via `prefers-color-scheme` AND `[data-theme]`.

## Code shape

- Blank lines between logical blocks: hooks · early returns · render.
- Effect logic in NAMED hooks, organized BY OWNER never by kind:
  single-consumer → colocate with the component; shared kit mechanics →
  `src/hooks/`, exported as public API; app contracts (session/org/
  registry) → the future console SDK, never here. No generic hooks
  package, no effect components in the kit.
- Strings as props (translatable); WCAG 2.2 AA; every data surface renders
  exactly one of skeleton → error → empty → data (four-state rule).
- Shape carries state beside color (circle/square/triangle/ring).
- Skeletons are layout-true, opacity-pulse only, die under reduced motion.

## Boundaries

Shell furniture (house bar, switchers, staff bar, rail, catalog rows) is
console-app composition — NOT kit. Promote only on a second consumer.
