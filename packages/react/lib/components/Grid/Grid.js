'use client';
import { jsx } from 'react/jsx-runtime';
import { mergeProps } from '@seed-design/dom-utils';
import * as React from 'react';
import { Box } from '../Box/Box.js';

const Grid = React.forwardRef((props, ref) => {
  const { align, justify, justifyItems, columns, rows, autoFlow, autoColumns, autoRows, ...rest } = props;
  return (
    // @ts-expect-error: display: "grid" is not allowed in the Box component
    /* @__PURE__ */ jsx(
      Box,
      {
        ref,
        alignItems: align,
        justifyContent: justify,
        ...mergeProps(rest, {
          className: "seed-grid",
          style: {
            "--seed-grid-columns": typeof columns === "number" ? `repeat(${columns}, minmax(0, 1fr))` : columns,
            "--seed-grid-rows": typeof rows === "number" ? `repeat(${rows}, minmax(0, 1fr))` : rows,
            "--seed-grid-auto-flow": autoFlow,
            "--seed-grid-auto-columns": autoColumns,
            "--seed-grid-auto-rows": autoRows,
            "--seed-grid-justify-items": justifyItems
          }
        })
      }
    )
  );
});

export { Grid };
