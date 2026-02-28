#!/usr/bin/env bash
# Publishes only @grapu-design/* packages whose current version is not on npm.
# Run from repo root. Run `bun run prepare-publish` first if you have workspace:* deps.
# Uses dependency order; skips packages that already have this version on npm.

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

PKGS=(
  packages/css
  packages/utils/dom-utils
  packages/utils/react-use-controllable-state
  packages/utils/react-supports
  packages/react-primitive
  packages/react-headless/avatar
  packages/react-headless/checkbox
  packages/react-headless/collapsible
  packages/react-headless/dialog
  packages/react-headless/drawer
  packages/react-headless/field
  packages/react-headless/field-button
  packages/react-headless/fieldset
  packages/react-headless/image
  packages/react-headless/popover
  packages/react-headless/portal
  packages/react-headless/progress
  packages/react-headless/pull-to-refresh
  packages/react-headless/radio-group
  packages/react-headless/segmented-control
  packages/react-headless/slider
  packages/react-headless/snackbar
  packages/react-headless/switch
  packages/react-headless/tabs
  packages/react-headless/text-field
  packages/react-headless/toggle
  packages/tokens
  packages/icons
  packages/react
  packages/stackflow
  packages/react-native
)

PUBLISHED=0
SKIPPED=0
FAILED=()

for pkg in "${PKGS[@]}"; do
  [[ -f "$pkg/package.json" ]] || continue

  name=$(node -e "console.log(require('$ROOT/$pkg/package.json').name)")
  version=$(node -e "console.log(require('$ROOT/$pkg/package.json').version)")

  if npm view "$name@$version" version &>/dev/null; then
    echo "Skip $name@$version (already on npm)"
    ((SKIPPED++)) || true
  else
    echo "Publishing $name@$version from $pkg..."
    if (cd "$pkg" && npm publish --access public); then
      echo "  OK"
      ((PUBLISHED++)) || true
    else
      echo "  FAILED"
      FAILED+=("$name@$version")
    fi
  fi
done

echo ""
echo "Done: $PUBLISHED published, $SKIPPED skipped"

if [[ ${#FAILED[@]} -gt 0 ]]; then
  echo "Failed (${#FAILED[@]}):"
  printf '  - %s\n' "${FAILED[@]}"
  exit 1
fi
