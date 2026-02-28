# Releasing Grape Design to npm and Using It Elsewhere

## Prerequisites

1. **npm account** – [Sign up](https://www.npmjs.com/signup) if needed.
2. **Login** – From the repo root:
   ```bash
   npm login
   ```
3. **Scoped package name** – `@grapu-design/*` is a scoped package. The first time you publish a scoped package as public you must use `"publishConfig": { "access": "public" }` in each `package.json` (see below). The npm org `grape-design` must exist or you publish under your own scope (e.g. `@your-username/grape-design-react` and update package names).

## 1. Add `publishConfig` (if missing)

Any package that will be published to npm needs in its `package.json`:

```json
"publishConfig": {
  "access": "public"
}
```

Add this to every publishable package under `packages/` that does not already have it (e.g. `@grapu-design/react`, `@grapu-design/css`, `@grapu-design/tokens`, `@grapu-design/stackflow`, `@grapu-design/icons`, `@grapu-design/react-native`, `@grapu-design/react-primitive`, `@grapu-design/dom-utils`). The headless and utils packages already have it.

## 2. Replace `workspace:*` with version ranges for publish

When consumers install from npm, `workspace:*` is not valid. Before publishing you must replace every `workspace:*` dependency with a real version range (e.g. the current release version).

**Option A – prepare script (recommended)**  
From repo root:

```bash
bun run prepare-publish
# Or with a specific version: node scripts/prepare-publish.js 0.2.0
```

This replaces every `workspace:*` in `packages/*` with `^<version>` (default: root `package.json` version). Then publish in the order below. After publishing, restore originals with:

```bash
git checkout -- packages/
```

**Option B – use a release tool**  
Use [Changesets](https://github.com/changesets/changesets) or [Lerna](https://lerna.js.org/) to manage versions and to rewrite workspace dependencies at publish time.

## 3. Publish order

Publish in dependency order so that when a package is published, its `@grapu-design/*` dependencies already exist on npm.

Suggested order:

1. **@grapu-design/css** (no Grape deps)
2. **@grapu-design/dom-utils** (no Grape deps)
3. **@grapu-design/react-use-controllable-state**, **@grapu-design/react-supports**
4. **@grapu-design/react-primitive**
5. All **@grapu-design/react-*** headless packages (avatar, checkbox, collapsible, dialog, drawer, field, field-button, fieldset, image, popover, portal, progress, pull-to-refresh, radio-group, segmented-control, slider, snackbar, switch, tabs, text-field, toggle)
6. **@grapu-design/tokens**
7. **@grapu-design/icons**
8. **@grapu-design/react**
9. **@grapu-design/stackflow**
10. **@grapu-design/react-native**

From the repo root, for each package:

```bash
cd packages/css && npm publish
cd ../tokens && npm publish
# ... etc.
```

Or publish all at once (after fixing workspace deps) with a loop:

```bash
# After replacing workspace:* with ^0.1.0 in all package.json files:
for pkg in packages/css packages/utils/dom-utils packages/utils/react-use-controllable-state packages/utils/react-supports packages/react-primitive packages/react-headless/avatar packages/react-headless/checkbox packages/react-headless/collapsible packages/react-headless/dialog packages/react-headless/drawer packages/react-headless/field packages/react-headless/field-button packages/react-headless/fieldset packages/react-headless/image packages/react-headless/popover packages/react-headless/portal packages/react-headless/progress packages/react-headless/pull-to-refresh packages/react-headless/radio-group packages/react-headless/segmented-control packages/react-headless/slider packages/react-headless/snackbar packages/react-headless/switch packages/react-headless/tabs packages/react-headless/text-field packages/react-headless/toggle packages/tokens packages/icons packages/react packages/stackflow packages/react-native; do
  (cd "$pkg" && npm publish)
done
```

## 4. Using Grape Design in another project

### React (web)

```bash
npm install @grapu-design/react @grapu-design/css
# or
bun add @grapu-design/react @grapu-design/css
```

In your app entry (e.g. `main.tsx` or `_app.tsx`):

```tsx
import "@grapu-design/css/base.css";
import "@grapu-design/css/recipes/box.css";
// Add other recipe CSS as needed (e.g. recipes/button.css, recipes/text.css)
```

Then use components:

```tsx
import { Box, Text, ActionButton } from "@grapu-design/react";

export function App() {
  return (
    <Box p="x4" bg="bg.neutralWeak">
      <Text textStyle="title1">Hello</Text>
      <ActionButton variant="primary">Submit</ActionButton>
    </Box>
  );
}
```

### React Native

```bash
npm install @grapu-design/react-native @grapu-design/tokens
# or
bun add @grapu-design/react-native @grapu-design/tokens
```

```tsx
import { Box, Text, ActionButton, Flex, Divider } from "@grapu-design/react-native";
```

### With Stackflow (navigation)

```bash
bun add @grapu-design/react @grapu-design/css @grapu-design/stackflow
```

Import and use `AppScreen`, `AppBar`, etc. from `@grapu-design/stackflow` as in the docs app.

## 5. Private registry (e.g. GitHub Packages)

To publish to GitHub Packages or another registry:

1. In each publishable `package.json` set:
   ```json
   "publishConfig": {
     "registry": "https://npm.pkg.github.com/your-org",
     "access": "public"
   }
   ```
2. Add a `.npmrc` in the repo (or in your home directory) with:
   ```
   //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
   ```
3. Replace `workspace:*` as in step 2, then run `npm publish` from each package directory.

Consumers then point npm at the same registry (e.g. `.npmrc` with `@grapu-design:registry=https://npm.pkg.github.com/your-org`) and run `npm install @grapu-design/react @grapu-design/css`.

## 6. After publishing

- Restore `workspace:*` in all `package.json` files if you want to keep developing in the monorepo with local linking.
- Tag the release in git (e.g. `git tag v0.1.0`) and push the tag.
- For future releases, bump versions (e.g. to `0.2.0`), update the dependency ranges that point at other `@grapu-design/*` packages to the new version, then publish again in the same order.
