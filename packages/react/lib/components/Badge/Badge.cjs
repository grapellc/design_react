'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const reactPrimitive = require('@grape-design/react-primitive');
const badge = require('@grape-design/css/recipes/badge');
const React = require('react');
const clsx = require('clsx');

const Badge = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const [variantProps, restProps] = badge.badge.splitVariantProps(props);
    const { root, label } = badge.badge(variantProps);
    return /* @__PURE__ */ jsxRuntime.jsx(reactPrimitive.Primitive.span, { className: clsx(root, className), ...restProps, ref, children: /* @__PURE__ */ jsxRuntime.jsx(reactPrimitive.Primitive.span, { className: label, children }) });
  }
);
Badge.displayName = "Badge";

exports.Badge = Badge;
