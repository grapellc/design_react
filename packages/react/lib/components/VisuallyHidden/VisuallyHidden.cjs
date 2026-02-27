'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const domUtils = require('@seed-design/dom-utils');
const reactPrimitive = require('@seed-design/react-primitive');
const React = require('react');

const VisuallyHidden = React.forwardRef((props, ref) => {
  const { style, ...otherProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(reactPrimitive.Primitive.div, { ref, style: { ...domUtils.visuallyHidden, ...style }, ...otherProps });
});

exports.VisuallyHidden = VisuallyHidden;
