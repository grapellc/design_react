'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const reactSlot = require('@radix-ui/react-slot');
const React = require('react');

const InternalIcon = React.forwardRef(
  ({ svg, ...otherProps }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(reactSlot.Slot, { ref, "aria-hidden": true, ...otherProps, children: svg });
  }
);

exports.InternalIcon = InternalIcon;
