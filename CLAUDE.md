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
  `@dataparbat/theme` (the sibling `theme/` repo) — two layers: `h-*` house chrome
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
- State lives in exactly one of five homes, chosen by KIND, never by
  convenience: server state → RTK Query (his ruling 2026-07-29, upholding
  the original frontend decision: the API layer is GENERATED from
  openapi.json — hand-written wire types are contract drift waiting to
  happen; baseApi owns problem normalization + the tag vocabulary; the
  session slice owns workspace with a listener resetting cache on switch).
  Ambient product identity (lens) → React Context as dependency injection;
  ephemeral UI → local useState; device prefs → localStorage; navigation →
  the URL. The console briefly ran TanStack Query (superseded same day,
  before the interior surfaces multiplied it). Legacy-app is prior art for
  NOTHING — the RTK layer builds fresh from the current backend.
- Responsiveness (ruling 58): desktop-primary, mobile-deliberate. Console
  CSS is desktop-first — the base IS the 1240 canvas rendition; phone
  arrives as the canvas's DRAWN phone tier via `max-width` overrides,
  never an undesigned fluid reflow. Each primitive carries its own phone
  idiom ONCE (table → stacked cards, sheet → full screen, overlay menus →
  bottom-anchored) so every product interior inherits the mobile story.
  A phone rendition is part of done for new screens. Marketing sites and
  docs are the inverse: mobile-first, mechanics and design both.
- Shape carries state beside color (circle/square/triangle/ring).
- Skeletons are layout-true, opacity-pulse only, die under reduced motion.

## Boundaries

The kit is shadcn-class PRIMITIVES only (his ruling 2026-07-29). Brand
values live in @dataparbat/theme; shared shell furniture (house bar,
switchers, staff bar) lives in @dataparbat/chrome — each its own package,
never folded here. Rail and catalog rows remain app composition.
