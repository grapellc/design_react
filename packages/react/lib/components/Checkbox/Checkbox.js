'use client';
import { jsx } from 'react/jsx-runtime';
import { checkbox } from '@grape-design/css/recipes/checkbox';
import { checkmark } from '@grape-design/css/recipes/checkmark';
import { splitMultipleVariantsProps } from '../../utils/splitMultipleVariantsProps.js';
import { mergeProps } from '@grape-design/dom-utils';
import { Checkbox, useCheckboxContext } from '@grape-design/react-checkbox';
import { Primitive } from '@grape-design/react-primitive';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';
import { createWithStateProps } from '../../utils/createWithStateProps.js';
import { InternalIcon } from '../private/Icon.js';
import { createRecipeContext } from '../../utils/createRecipeContext.js';
import { checkboxGroup } from '@grape-design/css/recipes/checkbox-group';

const { withContext: withGroupContext } = createRecipeContext(checkboxGroup);
const { ClassNamesProvider, withContext } = createSlotRecipeContext(checkbox);
const {
  withProvider: withCheckmarkProvider,
  useClassNames: useCheckmarkClassNames,
  PropsProvider: CheckmarkPropsProvider
} = createSlotRecipeContext(checkmark);
const withStateProps = createWithStateProps([useCheckboxContext]);
const CheckboxGroup = withGroupContext(Primitive.div);
const CheckboxRoot = Object.assign(
  forwardRef(({ className, ...props }, ref) => {
    if (process.env.NODE_ENV !== "production" && (props.weight === "default" || props.weight === "stronger")) {
      console.warn(
        `[SEED Design System] Checkbox weight='${props.weight}' is deprecated and will be removed in @seed-design/react@1.3.0. Use weight='${props.weight === "default" ? "regular" : "bold"}' instead.`
      );
    }
    const [{ checkbox: checkboxVariantProps, checkmark: checkmarkVariantProps }, otherProps] = splitMultipleVariantsProps(
      {
        ...props,
        // TODO: replace this mapping completely
        weight: props.weight === "stronger" ? "bold" : props.weight === "default" ? "regular" : props.weight
      },
      { checkbox, checkmark }
    );
    const classNames = checkbox(checkboxVariantProps);
    return /* @__PURE__ */ jsx(CheckmarkPropsProvider, { value: checkmarkVariantProps, children: /* @__PURE__ */ jsx(ClassNamesProvider, { value: classNames, children: /* @__PURE__ */ jsx(
      Checkbox.Root,
      {
        ref,
        className: clsx(classNames.root, className),
        ...otherProps
      }
    ) }) });
  }),
  {
    Primitive: Checkbox.Root
  }
);
const CheckboxControl = withCheckmarkProvider(
  Checkbox.Control,
  "root"
);
const CheckboxIndicator = forwardRef(
  ({
    unchecked: uncheckedSvg,
    checked: checkedSvg,
    indeterminate: indeterminateSvg,
    ...otherProps
  }, ref) => {
    const { stateProps, checked, indeterminate } = useCheckboxContext();
    const classNames = useCheckmarkClassNames();
    const mergedProps = mergeProps(
      stateProps,
      { className: classNames.icon },
      otherProps
    );
    if (indeterminate && !indeterminateSvg) {
      console.warn(
        "CheckboxIndicator: the `indeterminate` prop must be provided when the checkbox is in an indeterminate state."
      );
    }
    if (indeterminate) return /* @__PURE__ */ jsx(InternalIcon, { ref, svg: indeterminateSvg, ...mergedProps });
    if (checked) return /* @__PURE__ */ jsx(InternalIcon, { ref, svg: checkedSvg, ...mergedProps });
    if (uncheckedSvg) return /* @__PURE__ */ jsx(InternalIcon, { ref, svg: uncheckedSvg, ...mergedProps });
    return null;
  }
);
CheckboxIndicator.displayName = "CheckboxIndicator";
const CheckboxLabel = withContext(
  withStateProps(Primitive.span),
  "label"
);
const CheckboxHiddenInput = Checkbox.HiddenInput;

export { CheckboxControl, CheckboxGroup, CheckboxHiddenInput, CheckboxIndicator, CheckboxLabel, CheckboxRoot };
