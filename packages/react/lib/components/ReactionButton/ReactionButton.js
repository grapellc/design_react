'use client';
import { jsx } from 'react/jsx-runtime';
import { reactionButton } from '@seed-design/css/recipes/reaction-button';
import { Toggle } from '@seed-design/react-toggle';
import clsx from 'clsx';
import * as React from 'react';
import { usePendingButton, PendingButtonProvider } from '../LoadingIndicator/usePendingButton.js';

const ReactionButton = React.forwardRef(
  ({ size = "small", loading = false, className, ...otherProps }, ref) => {
    const recipeClassName = reactionButton({ size });
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
ReactionButton.displayName = "ReactionButton";

export { ReactionButton };
