'use client';
import { jsx } from 'react/jsx-runtime';
import { actionButton } from '@grape-design/css/recipes/action-button';
import { Primitive } from '@grape-design/react-primitive';
import clsx from 'clsx';
import * as React from 'react';
import { useStyleProps, handleColor } from '../../utils/styled.js';
import { IconRequired } from '../Icon/Icon.js';
import { usePendingButton, PendingButtonProvider } from '../LoadingIndicator/usePendingButton.js';
import { vars } from '@grape-design/css/vars';

const ActionButton = React.forwardRef(
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
    const recipeClassName = actionButton({ variant, layout, size });
    const api = usePendingButton({ loading, disabled: otherProps.disabled });
    const { style, restProps } = useStyleProps(otherProps);
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
        style: {
          ...style,
          ...color && { "--seed-box-color": handleColor(color) },
          ...fontWeight && { "--seed-font-weight": vars.$fontWeight[fontWeight] }
        },
        ...api.stateProps,
        ...restProps,
        children
      }
    ) }) });
  }
);
ActionButton.displayName = "ActionButton";

export { ActionButton };
