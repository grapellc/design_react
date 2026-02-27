'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const radio = require('@seed-design/css/recipes/radio');
const radioGroup = require('@seed-design/css/recipes/radio-group');
const radiomark = require('@seed-design/css/recipes/radiomark');
const domUtils = require('@seed-design/dom-utils');
const reactRadioGroup = require('@seed-design/react-radio-group');
const reactPrimitive = require('@seed-design/react-primitive');
const clsx = require('clsx');
const React = require('react');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');
const createWithStateProps = require('../../utils/createWithStateProps.cjs');
const Icon = require('../private/Icon.cjs');
const splitMultipleVariantsProps = require('../../utils/splitMultipleVariantsProps.cjs');
const createRecipeContext = require('../../utils/createRecipeContext.cjs');

const { withContext: withGroupContext } = createRecipeContext.createRecipeContext(radioGroup.radioGroup);
const { ClassNamesProvider, withContext } = createSlotRecipeContext.createSlotRecipeContext(radio.radio);
const {
  withProvider: withRadiomarkProvider,
  useClassNames: useRadiomarkClassNames,
  PropsProvider: RadiomarkPropsProvider
} = createSlotRecipeContext.createSlotRecipeContext(radiomark.radiomark);
const withStateProps = createWithStateProps.createWithStateProps([reactRadioGroup.useRadioGroupItemContext]);
const RadioGroupRoot = withGroupContext(reactPrimitive.Primitive.div);
const RadioGroupItem = Object.assign(
  React.forwardRef(({ className, ...props }, ref) => {
    const [{ radio: radioVariantProps, radiomark: radiomarkVariantProps }, otherProps] = splitMultipleVariantsProps.splitMultipleVariantsProps(props, { radio: radio.radio, radiomark: radiomark.radiomark });
    const classNames = radio.radio(radioVariantProps);
    return /* @__PURE__ */ jsxRuntime.jsx(RadiomarkPropsProvider, { value: radiomarkVariantProps, children: /* @__PURE__ */ jsxRuntime.jsx(ClassNamesProvider, { value: classNames, children: /* @__PURE__ */ jsxRuntime.jsx(
      reactRadioGroup.RadioGroup.Item,
      {
        ref,
        className: clsx(classNames.root, className),
        ...otherProps
      }
    ) }) });
  }),
  {
    Primitive: reactRadioGroup.RadioGroup.Item
  }
);
const RadioGroupItemLabel = withContext(
  withStateProps(reactPrimitive.Primitive.span),
  "label"
);
const RadioGroupItemControl = withRadiomarkProvider(reactRadioGroup.RadioGroup.ItemControl, "root");
const RadioGroupItemIndicator = React.forwardRef(
  ({ unchecked: uncheckedSvg, checked: checkedSvg, ...otherProps }, ref) => {
    const { stateProps, checked } = reactRadioGroup.useRadioGroupItemContext();
    const classNames = useRadiomarkClassNames();
    const mergedProps = domUtils.mergeProps(
      stateProps,
      { className: classNames.icon },
      otherProps
    );
    if (checked)
      return /* @__PURE__ */ jsxRuntime.jsx(
        Icon.InternalIcon,
        {
          ref,
          svg: checkedSvg ?? /* @__PURE__ */ jsxRuntime.jsx("svg", { "aria-hidden": "true", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntime.jsx("circle", { cx: "12", cy: "12", r: "12", fill: "currentColor" }) }),
          ...mergedProps
        }
      );
    if (uncheckedSvg) return /* @__PURE__ */ jsxRuntime.jsx(Icon.InternalIcon, { ref, svg: uncheckedSvg, ...mergedProps });
    return null;
  }
);
RadioGroupItemIndicator.displayName = "RadioGroupItemIndicator";
const RadioGroupItemHiddenInput = reactRadioGroup.RadioGroup.ItemHiddenInput;

exports.RadioGroupItem = RadioGroupItem;
exports.RadioGroupItemControl = RadioGroupItemControl;
exports.RadioGroupItemHiddenInput = RadioGroupItemHiddenInput;
exports.RadioGroupItemIndicator = RadioGroupItemIndicator;
exports.RadioGroupItemLabel = RadioGroupItemLabel;
exports.RadioGroupRoot = RadioGroupRoot;
