# Grape Design System

A design system that mirrors [seed-design](https://github.com/daangn/seed-design) components and runs on **React (web)** and **React Native**.

## Packages

| Package | Description |
|--------|-------------|
| `@grapu-design/tokens` | Shared design tokens. Web: re-exports from `@grapu-design/css`. Native: resolved values for React Native. |
| `@grapu-design/react` | Web components. Same API as Seed Design; built and maintained as Grape Design. |
| `@grapu-design/react-native` | React Native components with the same API surface (Box, Text, ActionButton, Flex, Divider). |

## React (web)

```bash
bun add @grapu-design/react @grapu-design/css
```

Import base and recipe CSS from Grape Design, then use the components:

```tsx
import "@grapu-design/css/base.css";
import "@grapu-design/css/recipes/box.css";
// ... other recipe CSS you need

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

Component names and props follow the same patterns as [Seed Design](https://seed-design.io); see the docs app for Grape Design usage.

## React Native

```bash
bun add @grapu-design/react-native @grapu-design/tokens
```

```tsx
import { Box, Text, ActionButton, Flex, Divider } from "@grapu-design/react-native";

export function Screen() {
  return (
    <Box p="x4" bg="neutralWeak">
      <Text textStyle="title1">Hello</Text>
      <ActionButton variant="primary" onPress={() => {}}>
        Submit
      </ActionButton>
      <Divider />
      <Flex gap="x2">
        <Text>Item 1</Text>
        <Text>Item 2</Text>
      </Flex>
    </Box>
  );
}
```

Tokens for React Native (spacing, colors, radius, typography) come from `@grapu-design/tokens/native` and are used by the components; you can use them for custom layouts:

```tsx
import { spacing, colors, radius } from "@grapu-design/tokens/native";
```

## Showcase (React web)

From the repo root, run the example app:

```bash
bun install
bun run build
bun run showcase
```

Then open **http://localhost:5174/** to see Layout, Typography, Buttons, Chips, Form controls, Tabs, Badge, Avatar, and Segmented control.

## Docs (Fumadocs)

Component documentation and live examples:

```bash
bun install
bun run build
bun run docs
```

Then open **http://localhost:3000/docs** for the docs site. The docs app uses Turbopack and includes all component examples from the registry.

## Monorepo setup

From the repo root:

```bash
bun install
bun run build
```

Build order: `tokens` → `react` and `react-native` (react-native depends on tokens).

## Publishing to npm and using in other projects

To publish Grape Design to npm (or a private registry) and use it in another app, see **[RELEASE.md](./RELEASE.md)**. It covers:

- Adding `publishConfig` for scoped packages
- Replacing `workspace:*` with version ranges before publish
- Publish order for all packages
- **Using in another project**: install `@grapu-design/react` and `@grapu-design/css`, import CSS and components as in the examples above
- Optional: publishing to GitHub Packages

After publishing, any project can run `bun add @grapu-design/react @grapu-design/css` (or `npm install`) and use the same imports as in this README.

## License

See NOTICE and repository license for details.
