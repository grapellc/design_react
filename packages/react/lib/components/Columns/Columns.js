'use client';
import { jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { Box } from '../Box/Box.js';

const Columns = React.forwardRef((props, ref) => {
  return /* @__PURE__ */ jsx(
    Box,
    {
      ref,
      display: "flex",
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "flex-start",
      ...props
    }
  );
});
const Column = React.forwardRef((props, ref) => {
  const { width, ...otherProps } = props;
  return /* @__PURE__ */ jsx(
    Box,
    {
      ref,
      display: "flex",
      flexDirection: "column",
      width: width !== "content" ? "full" : void 0,
      flexShrink: width ? 0 : void 0,
      flexGrow: width ? 0 : 1,
      ...otherProps
    }
  );
});

export { Column, Columns };
