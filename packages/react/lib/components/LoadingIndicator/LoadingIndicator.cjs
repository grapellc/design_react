'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const domUtils = require('@grape-design/dom-utils');
const reactPrimitive = require('@grape-design/react-primitive');
const React = require('react');
const usePendingButton = require('./usePendingButton.cjs');

const LoadingIndicator = React.forwardRef((props, ref) => {
  const { indicator, children, ...otherProps } = props;
  const { stateProps } = usePendingButton.usePendingButtonContext();
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      reactPrimitive.Primitive.span,
      {
        ref,
        ...domUtils.mergeProps(stateProps, { className: "seed-loading-indicator" }, otherProps),
        children: indicator
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(reactPrimitive.Primitive.span, { style: { opacity: 0, display: "inherit", gap: "inherit" }, children })
  ] });
});

exports.LoadingIndicator = LoadingIndicator;
