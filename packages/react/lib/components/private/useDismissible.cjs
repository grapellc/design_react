'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const reactUseControllableState = require('@radix-ui/react-use-controllable-state');
const domUtils = require('@seed-design/dom-utils');
const reactPrimitive = require('@seed-design/react-primitive');
const React = require('react');

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

function useDismissible(props) {
  const [open = true, setOpen] = reactUseControllableState.useControllableState({
    prop: props.open,
    defaultProp: props.defaultOpen,
    onChange: (open2) => {
      if (!open2) {
        props.onDismiss?.();
      }
    }
  });
  const dismiss = React__namespace.useCallback(() => setOpen(false), [setOpen]);
  return {
    open,
    dismiss,
    rootProps: domUtils.elementProps({}),
    dismissButtonProps: domUtils.buttonProps({
      onClick: (e) => {
        if (e.defaultPrevented) return;
        dismiss();
      }
    })
  };
}
const DismissibleContext = React__namespace.createContext(null);
const DismissibleProvider = DismissibleContext.Provider;
const useDismissibleContext = () => {
  const context = React__namespace.useContext(DismissibleContext);
  if (context === null) {
    throw new Error("useDismissibleContext should be used within DismissibleProvider");
  }
  return context;
};
const DismissibleRoot = React__namespace.forwardRef(
  ({ defaultOpen, open, onDismiss, ...otherProps }, ref) => {
    const api = useDismissible({ defaultOpen, open, onDismiss });
    if (!api.open) return null;
    return /* @__PURE__ */ jsxRuntime.jsx(DismissibleProvider, { value: api, children: /* @__PURE__ */ jsxRuntime.jsx(reactPrimitive.Primitive.div, { ref, ...otherProps }) });
  }
);
const DismissibleCloseButton = React__namespace.forwardRef((props, ref) => {
  const { dismissButtonProps } = useDismissibleContext();
  return /* @__PURE__ */ jsxRuntime.jsx(reactPrimitive.Primitive.button, { ref, ...domUtils.mergeProps(dismissButtonProps, props) });
});

exports.DismissibleCloseButton = DismissibleCloseButton;
exports.DismissibleProvider = DismissibleProvider;
exports.DismissibleRoot = DismissibleRoot;
exports.useDismissible = useDismissible;
exports.useDismissibleContext = useDismissibleContext;
