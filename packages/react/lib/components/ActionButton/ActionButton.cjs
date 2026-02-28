'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const actionButton = require('@grape-design/css/recipes/action-button');
const reactPrimitive = require('@grape-design/react-primitive');
const clsx = require('clsx');
const React = require('react');
const styled = require('../../utils/styled.cjs');
const Icon = require('../Icon/Icon.cjs');
const usePendingButton = require('../LoadingIndicator/usePendingButton.cjs');
const vars = require('@grape-design/css/vars');

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

const ActionButton = React__namespace.forwardRef(
  ({
    variant,
    size,
    loading = false,
    layout = "withText",
    color,
    fontWeight,
    className,
    children,
    ...otherProps
  }, ref) => {
    const recipeClassName = actionButton.actionButton({ variant, layout, size });
    const api = usePendingButton.usePendingButton({ loading, disabled: otherProps.disabled });
    const { style, restProps } = styled.useStyleProps(otherProps);
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
        style: {
          ...style,
          ...color && { "--seed-box-color": styled.handleColor(color) },
          ...fontWeight && { "--seed-font-weight": vars.vars.$fontWeight[fontWeight] }
        },
        ...api.stateProps,
        ...restProps,
        children
      }
    ) }) });
  }
);
ActionButton.displayName = "ActionButton";

exports.ActionButton = ActionButton;
