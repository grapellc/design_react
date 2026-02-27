'use client';
import { jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { Box } from '../Box/Box.js';

const Inline = React.forwardRef((props, ref) => {
  return /* @__PURE__ */ jsx(
    Box,
    {
      ref,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      ...props
    }
  );
});

export { Inline };
