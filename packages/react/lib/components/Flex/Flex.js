'use client';
import { jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { Box } from '../Box/Box.js';

const Flex = React.forwardRef((props, ref) => {
  const { direction, wrap, align, justify, grow, shrink, ...rest } = props;
  return /* @__PURE__ */ jsx(
    Box,
    {
      ref,
      display: "flex",
      flexDirection: direction,
      flexWrap: wrap,
      alignItems: align,
      justifyContent: justify,
      flexGrow: grow,
      flexShrink: shrink,
      ...rest
    }
  );
});

export { Flex };
