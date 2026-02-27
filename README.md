# Grape Design System

A design system that mirrors [seed-design](https://github.com/daangn/seed-design) components and runs on **React (web)** and **React Native**.

## Packages

| Package | Description |
|--------|-------------|
| `@grape-design/tokens` | Shared design tokens. Web: re-exports from `@seed-design/css`. Native: resolved values for React Native. |
| `@grape-design/react` | Web components. Re-exports all seed-design React components (same API). |
| `@grape-design/react-native` | React Native components with the same API surface (Box, Text, ActionButton, Flex, Divider). |

## React (web)

```bash
bun add @grape-design/react @seed-design/css
```

Import base and recipe CSS from seed-design, then use Grape components:

```tsx
import "@seed-design/css/base.css";
import "@seed-design/css/recipes/box.css";
// ... other recipe CSS you need

import { Box, Text, ActionButton } from "@grape-design/react";

export function App() {
  return (
    <Box p="x4" bg="bg.neutralWeak">
      <Text textStyle="title1">Hello</Text>
      <ActionButton variant="primary">Submit</ActionButton>
    </Box>
  );
}
```

All component names and props match seed-design’s [React documentation](https://seed-design.io).

## React Native

```bash
bun add @grape-design/react-native @grape-design/tokens
```

```tsx
import { Box, Text, ActionButton, Flex, Divider } from "@grape-design/react-native";

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

Tokens for React Native (spacing, colors, radius, typography) come from `@grape-design/tokens/native` and are used by the components; you can use them for custom layouts:

```tsx
import { spacing, colors, radius } from "@grape-design/tokens/native";
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

Component documentation and live examples (seed-design–style):

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

## License

Same as seed-design where components are derived; see NOTICE and seed-design license for details.
