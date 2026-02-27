'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const Flex = require('../Flex/Flex.cjs');

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

const Stack = React__namespace.forwardRef((props, ref) => {
  return /* @__PURE__ */ jsxRuntime.jsx(Flex.Flex, { ref, display: "flex", flexDirection: "column", ...props });
});
const VStack = React__namespace.forwardRef((props, ref) => {
  return /* @__PURE__ */ jsxRuntime.jsx(Flex.Flex, { ref, display: "flex", flexDirection: "column", ...props });
});
const HStack = React__namespace.forwardRef((props, ref) => {
  return /* @__PURE__ */ jsxRuntime.jsx(Flex.Flex, { ref, display: "flex", flexDirection: "row", ...props });
});

exports.HStack = HStack;
exports.Stack = Stack;
exports.VStack = VStack;
