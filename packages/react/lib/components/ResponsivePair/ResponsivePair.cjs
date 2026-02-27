'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const reactSlot = require('@radix-ui/react-slot');
const React = require('react');
const styled = require('../../utils/styled.cjs');
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

const ResponsivePair = React__namespace.forwardRef(
  (props, ref) => {
    const { wrap = "wrap-reverse", gap, children, ...rest } = props;
    const childrenArray = React__namespace.Children.toArray(children);
    const { style } = styled.useStyleProps({
      minWidth: `calc(${100 / childrenArray.length}% - ${styled.handleDimension(gap)} / ${childrenArray.length})`,
      flexGrow: 1
    });
    return /* @__PURE__ */ jsxRuntime.jsxs(
      Flex.Flex,
      {
        ref,
        display: "flex",
        flexDirection: "row",
        alignContent: "stretch",
        flexWrap: wrap,
        gap,
        ...rest,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(reactSlot.Slot, { style, children: childrenArray[0] }),
          /* @__PURE__ */ jsxRuntime.jsx(reactSlot.Slot, { style, children: childrenArray[1] })
        ]
      }
    );
  }
);

exports.ResponsivePair = ResponsivePair;
