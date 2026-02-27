'use client';
import { jsx } from 'react/jsx-runtime';
import { Switch, useSwitchContext } from '@seed-design/react-switch';
import { switchStyle } from '@seed-design/css/recipes/switch';
import { switchmark } from '@seed-design/css/recipes/switchmark';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';
import { Primitive } from '@seed-design/react-primitive';
import { createWithStateProps } from '../../utils/createWithStateProps.js';
import React__default from 'react';
import clsx from 'clsx';
import { splitMultipleVariantsProps } from '../../utils/splitMultipleVariantsProps.js';

const { withContext, ClassNamesProvider } = createSlotRecipeContext(switchStyle);
const {
  withContext: withControlContext,
  PropsProvider: ControlPropsProvider,
  withProvider: withControlProvider
} = createSlotRecipeContext(switchmark);
const withStateProps = createWithStateProps([useSwitchContext]);
const SwitchRoot = React__default.forwardRef(
  ({ className, ...props }, ref) => {
    if (process.env.NODE_ENV !== "production" && (props.size === "small" || props.size === "medium")) {
      console.warn(
        `[SEED Design System] Switch size='${props.size}' is deprecated and will be removed in @seed-design/react@1.3.0. Use size='${props.size === "small" ? "16" : "32"}' instead.`
      );
    }
    const [{ switch: switchVariantProps, switchmark: switchmarkVariantProps }, otherProps] = splitMultipleVariantsProps(
      {
        ...props,
        // TODO: replace this mapping completely
        size: props.size === "small" ? "16" : props.size === "medium" ? "32" : props.size
      },
      { switchmark, switch: switchStyle }
    );
    const classNames = switchStyle(switchVariantProps);
    return /* @__PURE__ */ jsx(ControlPropsProvider, { value: switchmarkVariantProps, children: /* @__PURE__ */ jsx(ClassNamesProvider, { value: classNames, children: /* @__PURE__ */ jsx(
      Switch.Root,
      {
        ref,
        className: clsx(classNames.root, className),
        ...otherProps
      }
    ) }) });
  }
);
SwitchRoot.displayName = "SwitchRoot";
const SwitchControl = withControlProvider(
  Switch.Control,
  "root"
);
const SwitchThumb = withControlContext(
  Switch.Thumb,
  "thumb"
);
const SwitchLabel = withContext(
  withStateProps(Primitive.span),
  "label"
);
const SwitchHiddenInput = Switch.HiddenInput;

export { SwitchControl, SwitchHiddenInput, SwitchLabel, SwitchRoot, SwitchThumb };
