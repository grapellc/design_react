'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const reactPrimitive = require('@seed-design/react-primitive');
const clsx = require('clsx');
const React = require('react');

const ConsistentWidth = React.forwardRef((props, ref) => {
  const { className, ...otherProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    reactPrimitive.Primitive.span,
    {
      "data-text": props.children,
      ref,
      className: clsx("seed-consistent-width", className),
      ...otherProps
    }
  );
});

exports.ConsistentWidth = ConsistentWidth;
