'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const listHeader = require('@grape-design/css/recipes/list-header');
const React = require('react');
const clsx = require('clsx');

const ListHeader = React.forwardRef(
  ({ as: Comp = "div", ...props }, ref) => {
    const [variantProps, otherProps] = listHeader.listHeader.splitVariantProps(props);
    const className = listHeader.listHeader(variantProps);
    return /* @__PURE__ */ jsxRuntime.jsx(Comp, { ref, ...otherProps, className: clsx(className, props.className) });
  }
);
ListHeader.displayName = "ListHeader";

exports.ListHeader = ListHeader;
