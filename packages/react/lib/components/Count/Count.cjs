'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const reactPrimitive = require('@seed-design/react-primitive');
const clsx = require('clsx');
const React = require('react');

const Count = React.forwardRef((props, ref) => {
  const { className, ...otherProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(reactPrimitive.Primitive.span, { ref, className: clsx("seed-count", className), ...otherProps });
});

exports.Count = Count;
