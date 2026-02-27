'use client';
import { jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { Flex } from '../Flex/Flex.js';

const Stack = React.forwardRef((props, ref) => {
  return /* @__PURE__ */ jsx(Flex, { ref, display: "flex", flexDirection: "column", ...props });
});
const VStack = React.forwardRef((props, ref) => {
  return /* @__PURE__ */ jsx(Flex, { ref, display: "flex", flexDirection: "column", ...props });
});
const HStack = React.forwardRef((props, ref) => {
  return /* @__PURE__ */ jsx(Flex, { ref, display: "flex", flexDirection: "row", ...props });
});

export { HStack, Stack, VStack };
