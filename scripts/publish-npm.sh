#!/usr/bin/env bash
# Publishes all @grapu-design/* packages to npm in dependency order.
# Run from repo root. Expects prepare-publish already run and NPM_TOKEN set or .npmrc present.
# Continues on failure and prints which packages failed at the end.

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

FAILED=()

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

for pkg in "${PKGS[@]}"; do
  if [[ -f "$pkg/package.json" ]]; then
    name=$(node -e "console.log(require('$ROOT/$pkg/package.json').name)")
    echo "Publishing $name from $pkg..."
    if (cd "$pkg" && npm publish --access public); then
      echo "  OK"
    else
      echo "  FAILED"
      FAILED+=("$name")
    fi
  fi
done

if [[ ${#FAILED[@]} -gt 0 ]]; then
  echo ""
  echo "Failed packages (${#FAILED[@]}):"
  printf '  - %s\n' "${FAILED[@]}"
  echo ""
  echo "Fix the errors above (e.g. bump version if already published), then re-run this script."
  exit 1
fi

echo "All 31 packages published."
