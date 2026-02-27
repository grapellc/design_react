'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const Box = require('../Box/Box.cjs');

function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
  if (e) {
    for (const k in e) {
      if (k !== 'default') {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}

const React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

const GridItem = React__namespace.forwardRef((props, ref) => {
  const { asChild = false, colSpan, colStart, colEnd, rowSpan, rowStart, rowEnd, ...rest } = props;
  const gridColumn = getGridLine(colSpan, colStart, colEnd);
  const gridRow = getGridLine(rowSpan, rowStart, rowEnd);
  return /* @__PURE__ */ jsxRuntime.jsx(Box.Box, { ref, asChild, gridColumn, gridRow, ...rest });
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

exports.GridItem = GridItem;
