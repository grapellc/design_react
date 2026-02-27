'use client';
import { jsx } from 'react/jsx-runtime';
import { toggleButton } from '@grape-design/css/recipes/toggle-button';
import { Toggle } from '@seed-design/react-toggle';
import clsx from 'clsx';
import * as React from 'react';
import { usePendingButton, PendingButtonProvider } from '../LoadingIndicator/usePendingButton.js';

const ToggleButton = React.forwardRef(
  ({ variant = "brandSolid", size = "small", loading = false, className, ...otherProps }, ref) => {
    const recipeClassName = toggleButton({ variant, size });
    const api = usePendingButton({ loading, disabled: otherProps.disabled });
    return /* @__PURE__ */ jsx(PendingButtonProvider, { value: api, children: /* @__PURE__ */ jsx(
      Toggle.Root,
      {
        ref,
        className: clsx(recipeClassName, className),
        ...api.stateProps,
        ...otherProps
      }
    ) });
  }
);
ToggleButton.displayName = "ToggleButton";

export { ToggleButton };
