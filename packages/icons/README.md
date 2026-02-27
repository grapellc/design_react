# @grape-design/icons

React icon components (monochrome and multicolor) built from seed-design–style SVG assets. Icons are inlined at build time, so no `/icons` public path or static assets are required in consuming apps.

## Asset source

By default, SVGs are read from `grape_design_dart/assets/icons/` (monochrome and multicolor subfolders). To use a different path:

```bash
ICONS_ASSETS_PATH=/path/to/icons bun run build
```

## Build

```bash
bun run build   # generate from assets + tsc
bun run generate   # only regenerate from assets
```

Icon names (e.g. `IconPlusFill`) are converted to filenames (e.g. `plus_fill.svg`) via the same convention as seed-design.
