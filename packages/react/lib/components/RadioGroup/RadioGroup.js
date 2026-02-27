'use client';
import { jsx } from 'react/jsx-runtime';
import { radio } from '@seed-design/css/recipes/radio';
import { radioGroup } from '@seed-design/css/recipes/radio-group';
import { radiomark } from '@seed-design/css/recipes/radiomark';
import { mergeProps } from '@seed-design/dom-utils';
import { RadioGroup, useRadioGroupItemContext } from '@seed-design/react-radio-group';
import { Primitive } from '@seed-design/react-primitive';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';
import { createWithStateProps } from '../../utils/createWithStateProps.js';
import { InternalIcon } from '../private/Icon.js';
import { splitMultipleVariantsProps } from '../../utils/splitMultipleVariantsProps.js';
import { createRecipeContext } from '../../utils/createRecipeContext.js';

const { withContext: withGroupContext } = createRecipeContext(radioGroup);
const { ClassNamesProvider, withContext } = createSlotRecipeContext(radio);
const {
  withProvider: withRadiomarkProvider,
  useClassNames: useRadiomarkClassNames,
  PropsProvider: RadiomarkPropsProvider
} = createSlotRecipeContext(radiomark);
const withStateProps = createWithStateProps([useRadioGroupItemContext]);
const RadioGroupRoot = withGroupContext(Primitive.div);
const RadioGroupItem = Object.assign(
  forwardRef(({ className, ...props }, ref) => {
    const [{ radio: radioVariantProps, radiomark: radiomarkVariantProps }, otherProps] = splitMultipleVariantsProps(props, { radio, radiomark });
    const classNames = radio(radioVariantProps);
    return /* @__PURE__ */ jsx(RadiomarkPropsProvider, { value: radiomarkVariantProps, children: /* @__PURE__ */ jsx(ClassNamesProvider, { value: classNames, children: /* @__PURE__ */ jsx(
      RadioGroup.Item,
      {
        ref,
        className: clsx(classNames.root, className),
        ...otherProps
      }
    ) }) });
  }),
  {
    Primitive: RadioGroup.Item
  }
);
const RadioGroupItemLabel = withContext(
  withStateProps(Primitive.span),
  "label"
);
const RadioGroupItemControl = withRadiomarkProvider(RadioGroup.ItemControl, "root");
const RadioGroupItemIndicator = forwardRef(
  ({ unchecked: uncheckedSvg, checked: checkedSvg, ...otherProps }, ref) => {
    const { stateProps, checked } = useRadioGroupItemContext();
    const classNames = useRadiomarkClassNames();
    const mergedProps = mergeProps(
      stateProps,
      { className: classNames.icon },
      otherProps
    );
    if (checked)
      return /* @__PURE__ */ jsx(
        InternalIcon,
        {
          ref,
          svg: checkedSvg ?? /* @__PURE__ */ jsx("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "12", fill: "currentColor" }) }),
          ...mergedProps
        }
      );
    if (uncheckedSvg) return /* @__PURE__ */ jsx(InternalIcon, { ref, svg: uncheckedSvg, ...mergedProps });
    return null;
  }
);
RadioGroupItemIndicator.displayName = "RadioGroupItemIndicator";
const RadioGroupItemHiddenInput = RadioGroup.ItemHiddenInput;

export { RadioGroupItem, RadioGroupItemControl, RadioGroupItemHiddenInput, RadioGroupItemIndicator, RadioGroupItemLabel, RadioGroupRoot };
