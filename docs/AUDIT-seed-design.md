# Grape Design React – Seed Design Audit

Audit of **grape_design_react** against **seed-design** (daangn/seed-design) to align Grape Design as your own version of the Seed Design architecture.

---

## 0. Folder structure (aligned with seed-design)

Grape uses the same folder layout as seed-design:

| Location | Contents |
|----------|----------|
| `packages/` | Top-level packages: `css`, `react`, `react-primitive`, `stackflow`, `tokens`, `icons`, `react-native` |
| `packages/react-headless/` | Headless React packages (one per component): `avatar/`, `checkbox/`, `collapsible/`, `dialog/`, `drawer/`, `field/`, `field-button/`, `fieldset/`, `image/`, `popover/`, `portal/`, `progress/`, `pull-to-refresh/`, `radio-group/`, `segmented-control/`, `slider/`, `snackbar/`, `switch/`, `tabs/`, `text-field/`, `toggle/` |
| `packages/utils/` | Shared utilities: `dom-utils/`, `react-use-controllable-state/`, `react-supports/` |
| `examples/` | `docs/`, `showcase/` |

Root `package.json` workspaces:

```json
"workspaces": ["packages/*", "packages/react-headless/*", "packages/utils/*", "examples/*"]
```

Package names are unchanged (e.g. `@grape-design/react-avatar`, `@grape-design/dom-utils`); only the on-disk paths match seed-design.

---

## 0.1. Seed-design independence (all levels)

**Runtime and install:** Grape Design does **not** depend on any `@seed-design/*` package at runtime or in `package.json`. All former seed-design dependencies are satisfied by workspace packages:

- `packages/react` → `@grape-design/dom-utils`, `@grape-design/react-*` (workspace)
- `packages/stackflow` → `@grape-design/dom-utils`, `@grape-design/react-primitive` (workspace)
- `packages/tokens` → `@grape-design/css` (workspace)
- `examples/docs`, `examples/showcase` → `@grape-design/css`, `@grape-design/react`, `@grape-design/stackflow` (workspace)

**Source:** Imports in `packages/react`, `packages/stackflow`, and `examples/docs` use `@grape-design/*` only. Docs app `global.css` and registry use `@grape-design/css`.

**Build-time only:** `packages/css/qvism.config.mjs` still imports `@seed-design/qvism-preset` to generate recipe CSS. That is the only remaining seed-design reference; it is build-time only (no runtime dependency). To remove it, add a local `@grape-design/qvism-preset` (copy or re-export) and point the config there.

**Stale build output:** `packages/react-headless/*/lib/*.js` were built before renames and may still contain `@seed-design` in bundled imports. Rebuild those packages (`bun run build` in each or from root) to regenerate with `@grape-design` imports.

---

## 1. Package layout comparison

### Seed Design (reference)

| Category        | Packages |
|----------------|----------|
| **Definitions** | `@seed-design/rootage`, `@seed-design/qvism-preset` |
| **Base**       | `@seed-design/css` |
| **React**      | `@seed-design/react` (main), `@seed-design/react-headless/*` (per-component) |
| **Primitives** | `@seed-design/react-primitive`, `@seed-design/dom-utils` + many `@seed-design/react-*` (avatar, checkbox, dialog, drawer, field, tabs, etc.) |
| **Navigation**  | `@seed-design/stackflow` |
| **Tooling**    | CLI, codemod, figma, mcp, rsbuild/vite/webpack/tailwind plugins |
| **Ecosystem**  | rootage (tokens), qvism (recipes), figma-extractor |

### Grape Design (current)

| Category        | Packages | Status |
|----------------|----------|--------|
| **Definitions** | — | Uses seed tooling: `rootage` / `qvism` CLI + `@seed-design/qvism-preset` in `@grape-design/css` |
| **Base**       | `@grape-design/css` | Own package; generates from rootage/qvism with `--prefix seed` |
| **React**      | `@grape-design/react` | Own components; **wraps** `@seed-design/react-*` primitives |
| **Primitives** | `@grape-design/react-primitive`, `@grape-design/dom-utils` | Implemented but **not used**; react still uses `@seed-design/*` |
| **Tokens**     | `@grape-design/tokens` | Own; re-exports / uses `@seed-design/css` |
| **Navigation**  | `@grape-design/stackflow` | Own; depends on `@seed-design/dom-utils`, `@seed-design/react-primitive` |
| **Icons**      | `@grape-design/icons` | Own |
| **React Native**| `@grape-design/react-native` | Own; uses `@grape-design/tokens` |

---

## 2. Dependency audit: @grape-design/react

### 2.1 External seed-design dependencies (packages/react/package.json)

| Dependency | Used for |
|------------|----------|
| `@seed-design/css` | Fallback/coexistence with `@grape-design/css`; styling vars/recipes |
| `@seed-design/dom-utils` | `mergeProps`, `dataAttr`, `visuallyHidden`, `buttonProps`, `elementProps` |
| `@seed-design/react-primitive` | `Primitive`, `PrimitiveProps` in many components |
| `@seed-design/react-avatar` | Avatar primitive (Image) |
| `@seed-design/react-checkbox` | Checkbox, CheckSelectBox, List (check), Chip (checkbox) |
| `@seed-design/react-collapsible` | SelectBox (Check/Radio) |
| `@seed-design/react-dialog` | Dialog, ActionSheet, MenuSheet, ExtendedActionSheet, BottomSheet (Drawer) |
| `@seed-design/react-drawer` | BottomSheet, BottomSheetHandle |
| `@seed-design/react-field` | Field, TextField, Slider, Fieldset |
| `@seed-design/react-field-button` | FieldButton |
| `@seed-design/react-fieldset` | Fieldset |
| `@seed-design/react-image` | Avatar, ImageFrame |
| `@seed-design/react-popover` | HelpBubble |
| `@seed-design/react-portal` | Portal (re-export) |
| `@seed-design/react-progress` | ProgressCircle |
| `@seed-design/react-pull-to-refresh` | PullToRefresh |
| `@seed-design/react-radio-group` | RadioGroup, RadioGroupField, RadioSelectBox, List (radio), Chip (radio) |
| `@seed-design/react-segmented-control` | SegmentedControl |
| `@seed-design/react-slider` | Slider |
| `@seed-design/react-snackbar` | Snackbar |
| `@seed-design/react-switch` | Switch, List (switch) |
| `@seed-design/react-tabs` | Tabs, ChipTabs |
| `@seed-design/react-text-field` | TextField |
| `@seed-design/react-toggle` | ToggleButton, ReactionButton, ImageFrame |

### 2.2 Already Grape-owned

- **Styling**: All component recipes and `@grape-design/css/vars` are used in source (e.g. `@grape-design/css/recipes/*`, `@grape-design/css/vars`).
- **Exports**: `packages/react/src/primitive.ts` re-exports seed-design primitives; component API is Grape (same names as Seed).

---

## 3. Source-level usage of @seed-design

| Import pattern | Occurrences (approx) | Location |
|----------------|----------------------|----------|
| `@seed-design/react-primitive` | 30+ | Most components (Primitive, PrimitiveProps) |
| `@seed-design/dom-utils` | 15+ | mergeProps, dataAttr, visuallyHidden, etc. |
| `@seed-design/react-dialog` | 5 | Dialog, ActionSheet, MenuSheet, ExtendedActionSheet |
| `@seed-design/react-drawer` | 2 | BottomSheet, BottomSheetHandle |
| `@seed-design/react-field` | 4 | Field, TextField, Slider, Fieldset |
| `@seed-design/react-checkbox` | 3 | Checkbox, CheckSelectBox, List, Chip |
| `@seed-design/react-radio-group` | 4 | RadioGroup, RadioGroupField, RadioSelectBox, List, Chip |
| `@seed-design/react-*` (others) | 1–2 each | See table in 2.1 |

---

## 4. Docs / examples usage

- **Registry and custom blocks**: Use `@grape-design/react` (e.g. ActionSheet, Snackbar, PageBanner, MenuSheet, BottomSheet, HelpBubble, Callout, InlineBanner).
- **Example snippets**: Mostly `@seed-design/react` and `@seed-design/stackflow` (VStack, HStack, Box, Flex, Icon, Text, Portal, etc.).
- **Stackflow**: Uses `@seed-design/stackflow` (AppBar, AppScreen, `useActivityZIndexBase`, `seedPlugin`); `@grape-design/stackflow` exists but docs still reference seed.

So: **docs are mixed** — Grape for some UI, Seed for layout and stackflow in examples.

---

## 5. Gaps to have “Grape Design = your version of Seed Design”

To make Grape Design a full, standalone version of Seed Design (no runtime dependency on `@seed-design/*` for React/CSS/stackflow):

### 5.1 Already in place

- [x] `@grape-design/css` with vars + recipes (generated via rootage/qvism; can later switch to grape-specific preset).
- [x] `@grape-design/react` component set with same API as Seed, using `@grape-design/css` for styling.
- [x] `@grape-design/react-primitive` and `@grape-design/dom-utils` implemented locally (not yet wired).

### 5.2 Replace in @grape-design/react

| Goal | Action |
|------|--------|
| **Use Grape primitives** | In `packages/react`, replace all `@seed-design/react-primitive` with `@grape-design/react-primitive`. Ensure API compatibility (e.g. `Primitive`, `PrimitiveProps`, `asChild`). |
| **Use Grape dom-utils** | Replace all `@seed-design/dom-utils` with `@grape-design/dom-utils` in react and stackflow. |
| **Use Grape “headless” primitives** | For each `@seed-design/react-*` (avatar, checkbox, dialog, drawer, field, field-button, fieldset, image, popover, portal, progress, pull-to-refresh, radio-group, segmented-control, slider, snackbar, switch, tabs, text-field, toggle), either: (A) Copy/fork that package into the repo as `packages/react-headless/<name>` and publish as `@grape-design/react-<name>`, or (B) Implement a minimal compatible API in `@grape-design/react` that no longer depends on the seed package. |

### 5.3 CSS and tokens

| Goal | Action |
|------|--------|
| **Optional: Grape-only CSS** | Today `@grape-design/css` uses `rootage`/`qvism` with `--prefix seed` and `@seed-design/qvism-preset`. For a fully independent Grape Design: add `@grape-design/rootage` (or equivalent) and `@grape-design/qvism-preset`, and generate with a `grape` prefix if desired. |
| **Optional: Drop @seed-design/css** | Remove `@seed-design/css` from `@grape-design/react` and `@grape-design/tokens` once everything uses `@grape-design/css` only. |

### 5.4 Stackflow

| Goal | Action |
|------|--------|
| **Use Grape stackflow only** | In `@grape-design/stackflow`, replace `@seed-design/dom-utils` and `@seed-design/react-primitive` with `@grape-design/*`. |
| **Docs** | In examples/docs, replace `@seed-design/react` and `@seed-design/stackflow` with `@grape-design/react` and `@grape-design/stackflow` everywhere. |

### 5.5 Docs / examples

- Replace every `@seed-design/react` and `@seed-design/stackflow` import with `@grape-design/react` and `@grape-design/stackflow`.
- Use `@grape-design/icons` (and any other grape packages) consistently; remove remaining `@seed-design/react-icon` if present.

---

## 6. Recommended order of work (roadmap)

1. **Switch react to Grape primitives and dom-utils**  
   - In `packages/react`: `@seed-design/react-primitive` → `@grape-design/react-primitive`, `@seed-design/dom-utils` → `@grape-design/dom-utils`.  
   - In `packages/stackflow`: same for dom-utils and react-primitive.  
   - Fix types and tests; ensure build and docs still run.

2. **Headless / behavior layer**  
   - Pick one approach: (A) Fork seed-design’s `packages/react-headless/*` into your repo as `@grape-design/react-*`, or (B) Inline minimal behavior into `@grape-design/react` and remove dependency on each `@seed-design/react-*`.  
   - Do one component (e.g. Dialog or Checkbox) end-to-end, then repeat for the rest.

3. **Docs and examples**  
   - Replace all `@seed-design/react` and `@seed-design/stackflow` with `@grape-design/react` and `@grape-design/stackflow`; run typecheck and build.

4. **Optional: CSS/tokens independence**  
   - Introduce Grape-specific rootage/qvism preset and, if needed, drop `@seed-design/css` from the dependency tree.

5. **Cleanup**  
   - Remove all `@seed-design/*` dependencies from `package.json` files; lockfile and CI should have no seed-design packages for the packages you intend to be “full Grape”.

---

## 7. Summary

| Aspect | Current state | Target (your version of Seed Design) |
|--------|----------------|--------------------------------------|
| **Component API** | Same as Seed (Grape re-exports/wraps) | Same; 100% from `@grape-design/react` |
| **Styling** | `@grape-design/css` + optional `@seed-design/css` | `@grape-design/css` only |
| **Primitives** | `@seed-design/react-primitive`, `@seed-design/dom-utils` | `@grape-design/react-primitive`, `@grape-design/dom-utils` |
| **Headless/behavior** | All `@seed-design/react-*` | `@grape-design/react-*` or inlined in `@grape-design/react` |
| **Stackflow** | `@grape-design/stackflow` + docs on `@seed-design/stackflow` | `@grape-design/stackflow` only in docs and app |
| **Docs/examples** | Mixed Grape + Seed | 100% Grape |

After the migration, **Grape Design React** will be your self-contained version of Seed Design: same architecture and API, no runtime dependency on seed-design packages.
