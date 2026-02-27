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

const Columns = React__namespace.forwardRef((props, ref) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Box.Box,
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
const Column = React__namespace.forwardRef((props, ref) => {
  const { width, ...otherProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Box.Box,
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

exports.Column = Column;
exports.Columns = Columns;
