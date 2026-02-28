'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const contextualFloatingButton = require('@grape-design/css/recipes/contextual-floating-button');
const reactPrimitive = require('@grape-design/react-primitive');
const clsx = require('clsx');
const React = require('react');
const Icon = require('../Icon/Icon.cjs');
const usePendingButton = require('../LoadingIndicator/usePendingButton.cjs');

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

const ContextualFloatingButton = React__namespace.forwardRef(({ variant, loading = false, layout = "withText", className, children, ...otherProps }, ref) => {
  const recipeClassName = contextualFloatingButton.contextualFloatingButton({ variant, layout });
  const api = usePendingButton.usePendingButton({ loading, disabled: otherProps.disabled });
  if (layout === "iconOnly" && !(otherProps["aria-label"] || otherProps["aria-labelledby"])) {
    console.warn(
      "When layout is 'iconOnly', 'aria-label' or 'aria-labelledby' should be provided."
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(usePendingButton.PendingButtonProvider, { value: api, children: /* @__PURE__ */ jsxRuntime.jsx(Icon.IconRequired, { enabled: layout === "iconOnly", children: /* @__PURE__ */ jsxRuntime.jsx(
    reactPrimitive.Primitive.button,
    {
      ref,
      className: clsx(recipeClassName, className),
      ...api.stateProps,
      ...otherProps,
      children
    }
  ) }) });
});
ContextualFloatingButton.displayName = "ContextualFloatingButton";

exports.ContextualFloatingButton = ContextualFloatingButton;
