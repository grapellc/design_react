'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const domUtils = require('@seed-design/dom-utils');
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

const Grid = React__namespace.forwardRef((props, ref) => {
  const { align, justify, justifyItems, columns, rows, autoFlow, autoColumns, autoRows, ...rest } = props;
  return (
    // @ts-expect-error: display: "grid" is not allowed in the Box component
    /* @__PURE__ */ jsxRuntime.jsx(
      Box.Box,
      {
        ref,
        alignItems: align,
        justifyContent: justify,
        ...domUtils.mergeProps(rest, {
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

exports.Grid = Grid;
