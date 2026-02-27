'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const clsx = require('clsx');
const React = require('react');
const styled = require('../../utils/styled.cjs');
const reactSlot = require('@radix-ui/react-slot');

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

const Box = React__namespace.forwardRef((props, ref) => {
  const { style, restProps } = styled.useStyleProps(props);
  const { as: Comp = "div", asChild = false, className, ...nativeProps } = restProps;
  if (asChild) {
    return /* @__PURE__ */ jsxRuntime.jsx(reactSlot.Slot, { ref, className: clsx("seed-box", className), style, ...nativeProps });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(Comp, { ref, className: clsx("seed-box", className), style, ...nativeProps });
});

exports.Box = Box;
