'use client';
import { jsx } from 'react/jsx-runtime';
import { contextualFloatingButton } from '@grape-design/css/recipes/contextual-floating-button';
import { Primitive } from '@grape-design/react-primitive';
import clsx from 'clsx';
import * as React from 'react';
import { IconRequired } from '../Icon/Icon.js';
import { usePendingButton, PendingButtonProvider } from '../LoadingIndicator/usePendingButton.js';

const ContextualFloatingButton = React.forwardRef(({ variant, loading = false, layout = "withText", className, children, ...otherProps }, ref) => {
  const recipeClassName = contextualFloatingButton({ variant, layout });
  const api = usePendingButton({ loading, disabled: otherProps.disabled });
  if (layout === "iconOnly" && !(otherProps["aria-label"] || otherProps["aria-labelledby"])) {
    console.warn(
      "When layout is 'iconOnly', 'aria-label' or 'aria-labelledby' should be provided."
    );
  }
  return /* @__PURE__ */ jsx(PendingButtonProvider, { value: api, children: /* @__PURE__ */ jsx(IconRequired, { enabled: layout === "iconOnly", children: /* @__PURE__ */ jsx(
    Primitive.button,
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

export { ContextualFloatingButton };
