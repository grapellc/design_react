/**
 * Replaces workspace:* with a concrete version range in all package.json under packages/
 * so they are valid for npm publish. Run before publishing; restore with git after.
 *
 * Usage: node scripts/prepare-publish.js [version]
 * Default version: 0.1.0 (or use the root package.json version)
 */

const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const version = process.argv[2] || require(path.join(rootDir, "package.json")).version;
const range = `^${version}`;

const packageDirs = [
  "packages/css",
  "packages/utils/dom-utils",
  "packages/utils/react-use-controllable-state",
  "packages/utils/react-supports",
  "packages/react-primitive",
  "packages/react-headless/avatar",
  "packages/react-headless/checkbox",
  "packages/react-headless/collapsible",
  "packages/react-headless/dialog",
  "packages/react-headless/drawer",
  "packages/react-headless/field",
  "packages/react-headless/field-button",
  "packages/react-headless/fieldset",
  "packages/react-headless/image",
  "packages/react-headless/popover",
  "packages/react-headless/portal",
  "packages/react-headless/progress",
  "packages/react-headless/pull-to-refresh",
  "packages/react-headless/radio-group",
  "packages/react-headless/segmented-control",
  "packages/react-headless/slider",
  "packages/react-headless/snackbar",
  "packages/react-headless/switch",
  "packages/react-headless/tabs",
  "packages/react-headless/text-field",
  "packages/react-headless/toggle",
  "packages/tokens",
  "packages/icons",
  "packages/react",
  "packages/stackflow",
  "packages/react-native",
];

function replaceWorkspaceRefs(obj) {
  let changed = false;
  for (const key of ["dependencies", "peerDependencies", "devDependencies"]) {
    if (!obj[key] || typeof obj[key] !== "object") continue;
    for (const dep of Object.keys(obj[key])) {
      if (obj[key][dep] === "workspace:*") {
        obj[key][dep] = range;
        changed = true;
      }
    }
  }
  return changed;
}

let count = 0;
for (const dir of packageDirs) {
  const pkgPath = path.join(rootDir, dir, "package.json");
  if (!fs.existsSync(pkgPath)) continue;
  const content = fs.readFileSync(pkgPath, "utf8");
  const pkg = JSON.parse(content);
  if (replaceWorkspaceRefs(pkg)) {
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
    count++;
    console.log(`Updated ${dir}/package.json`);
  }
}
console.log(`Done. Replaced workspace:* with "${range}" in ${count} package(s).`);
console.log("Publish from each package, then run: git checkout -- packages/ to restore workspace:*");
