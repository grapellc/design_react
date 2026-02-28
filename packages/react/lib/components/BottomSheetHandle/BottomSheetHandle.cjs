'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const reactPrimitive = require('@grape-design/react-primitive');
const reactDrawer = require('@grape-design/react-drawer');
const bottomSheetHandle = require('@grape-design/css/recipes/bottom-sheet-handle');
const React = require('react');
const clsx = require('clsx');

const BottomSheetHandle = React.forwardRef(
  ({ className, ...props }, ref) => {
    const classNames = bottomSheetHandle.bottomSheetHandle();
    return /* @__PURE__ */ jsxRuntime.jsx(reactDrawer.Drawer.Handle, { ref, className: clsx(classNames.root, className), ...props, children: /* @__PURE__ */ jsxRuntime.jsx(reactPrimitive.Primitive.div, { "aria-hidden": "true", className: classNames.touchArea }) });
  }
);
BottomSheetHandle.displayName = "BottomSheetHandle";

exports.BottomSheetHandle = BottomSheetHandle;
