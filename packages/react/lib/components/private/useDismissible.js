'use client';
import { jsx } from 'react/jsx-runtime';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { mergeProps, buttonProps, elementProps } from '@seed-design/dom-utils';
import { Primitive } from '@seed-design/react-primitive';
import * as React from 'react';

function useDismissible(props) {
  const [open = true, setOpen] = useControllableState({
    prop: props.open,
    defaultProp: props.defaultOpen,
    onChange: (open2) => {
      if (!open2) {
        props.onDismiss?.();
      }
    }
  });
  const dismiss = React.useCallback(() => setOpen(false), [setOpen]);
  return {
    open,
    dismiss,
    rootProps: elementProps({}),
    dismissButtonProps: buttonProps({
      onClick: (e) => {
        if (e.defaultPrevented) return;
        dismiss();
      }
    })
  };
}
const DismissibleContext = React.createContext(null);
const DismissibleProvider = DismissibleContext.Provider;
const useDismissibleContext = () => {
  const context = React.useContext(DismissibleContext);
  if (context === null) {
    throw new Error("useDismissibleContext should be used within DismissibleProvider");
  }
  return context;
};
const DismissibleRoot = React.forwardRef(
  ({ defaultOpen, open, onDismiss, ...otherProps }, ref) => {
    const api = useDismissible({ defaultOpen, open, onDismiss });
    if (!api.open) return null;
    return /* @__PURE__ */ jsx(DismissibleProvider, { value: api, children: /* @__PURE__ */ jsx(Primitive.div, { ref, ...otherProps }) });
  }
);
const DismissibleCloseButton = React.forwardRef((props, ref) => {
  const { dismissButtonProps } = useDismissibleContext();
  return /* @__PURE__ */ jsx(Primitive.button, { ref, ...mergeProps(dismissButtonProps, props) });
});

export { DismissibleCloseButton, DismissibleProvider, DismissibleRoot, useDismissible, useDismissibleContext };
