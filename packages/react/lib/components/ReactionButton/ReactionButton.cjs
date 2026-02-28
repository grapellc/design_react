'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const reactionButton = require('@grape-design/css/recipes/reaction-button');
const reactToggle = require('@grape-design/react-toggle');
const clsx = require('clsx');
const React = require('react');
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

const ReactionButton = React__namespace.forwardRef(
  ({ size = "small", loading = false, className, ...otherProps }, ref) => {
    const recipeClassName = reactionButton.reactionButton({ size });
    const api = usePendingButton.usePendingButton({ loading, disabled: otherProps.disabled });
    return /* @__PURE__ */ jsxRuntime.jsx(usePendingButton.PendingButtonProvider, { value: api, children: /* @__PURE__ */ jsxRuntime.jsx(
      reactToggle.Toggle.Root,
      {
        ref,
        className: clsx(recipeClassName, className),
        ...api.stateProps,
        ...otherProps
      }
    ) });
  }
);
ReactionButton.displayName = "ReactionButton";

exports.ReactionButton = ReactionButton;
