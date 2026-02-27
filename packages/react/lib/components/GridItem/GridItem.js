'use client';
import { jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { Box } from '../Box/Box.js';

const GridItem = React.forwardRef((props, ref) => {
  const { asChild = false, colSpan, colStart, colEnd, rowSpan, rowStart, rowEnd, ...rest } = props;
  const gridColumn = getGridLine(colSpan, colStart, colEnd);
  const gridRow = getGridLine(rowSpan, rowStart, rowEnd);
  return /* @__PURE__ */ jsx(Box, { ref, asChild, gridColumn, gridRow, ...rest });
});
GridItem.displayName = "GridItem";
function getGridLine(span, start, end) {
  if (span === "full") return "1 / -1";
  if (start !== void 0 && end !== void 0) return `${start} / ${end}`;
  if (start !== void 0) return `${start}`;
  if (end !== void 0) return `auto / ${end}`;
  if (span !== void 0) return `span ${span}`;
  return void 0;
}

export { GridItem };
