'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const checkbox = require('@grape-design/css/recipes/checkbox');
const checkmark = require('@grape-design/css/recipes/checkmark');
const splitMultipleVariantsProps = require('../../utils/splitMultipleVariantsProps.cjs');
const domUtils = require('@grape-design/dom-utils');
const reactCheckbox = require('@grape-design/react-checkbox');
const reactPrimitive = require('@grape-design/react-primitive');
const clsx = require('clsx');
const React = require('react');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');
const createWithStateProps = require('../../utils/createWithStateProps.cjs');
const Icon = require('../private/Icon.cjs');
const createRecipeContext = require('../../utils/createRecipeContext.cjs');
const checkboxGroup = require('@grape-design/css/recipes/checkbox-group');

const { withContext: withGroupContext } = createRecipeContext.createRecipeContext(checkboxGroup.checkboxGroup);
const { ClassNamesProvider, withContext } = createSlotRecipeContext.createSlotRecipeContext(checkbox.checkbox);
const {
  withProvider: withCheckmarkProvider,
  useClassNames: useCheckmarkClassNames,
  PropsProvider: CheckmarkPropsProvider
} = createSlotRecipeContext.createSlotRecipeContext(checkmark.checkmark);
const withStateProps = createWithStateProps.createWithStateProps([reactCheckbox.useCheckboxContext]);
const CheckboxGroup = withGroupContext(reactPrimitive.Primitive.div);
const CheckboxRoot = Object.assign(
  React.forwardRef(({ className, ...props }, ref) => {
    if (process.env.NODE_ENV !== "production" && (props.weight === "default" || props.weight === "stronger")) {
      console.warn(
        `[Grape Design] Checkbox weight='${props.weight}' is deprecated and will be removed in @grape-design/react@1.3.0. Use weight='${props.weight === "default" ? "regular" : "bold"}' instead.`
      );
    }
    const [{ checkbox: checkboxVariantProps, checkmark: checkmarkVariantProps }, otherProps] = splitMultipleVariantsProps.splitMultipleVariantsProps(
      {
        ...props,
        // TODO: replace this mapping completely
        weight: props.weight === "stronger" ? "bold" : props.weight === "default" ? "regular" : props.weight
      },
      { checkbox: checkbox.checkbox, checkmark: checkmark.checkmark }
    );
    const classNames = checkbox.checkbox(checkboxVariantProps);
    return /* @__PURE__ */ jsxRuntime.jsx(CheckmarkPropsProvider, { value: checkmarkVariantProps, children: /* @__PURE__ */ jsxRuntime.jsx(ClassNamesProvider, { value: classNames, children: /* @__PURE__ */ jsxRuntime.jsx(
      reactCheckbox.Checkbox.Root,
      {
        ref,
        className: clsx(classNames.root, className),
        ...otherProps
      }
    ) }) });
  }),
  {
    Primitive: reactCheckbox.Checkbox.Root
  }
);
const CheckboxControl = withCheckmarkProvider(
  reactCheckbox.Checkbox.Control,
  "root"
);
const CheckboxIndicator = React.forwardRef(
  ({
    unchecked: uncheckedSvg,
    checked: checkedSvg,
    indeterminate: indeterminateSvg,
    ...otherProps
  }, ref) => {
    const { stateProps, checked, indeterminate } = reactCheckbox.useCheckboxContext();
    const classNames = useCheckmarkClassNames();
    const mergedProps = domUtils.mergeProps(
      stateProps,
      { className: classNames.icon },
      otherProps
    );
    if (indeterminate && !indeterminateSvg) {
      console.warn(
        "CheckboxIndicator: the `indeterminate` prop must be provided when the checkbox is in an indeterminate state."
      );
    }
    if (indeterminate) return /* @__PURE__ */ jsxRuntime.jsx(Icon.InternalIcon, { ref, svg: indeterminateSvg, ...mergedProps });
    if (checked) return /* @__PURE__ */ jsxRuntime.jsx(Icon.InternalIcon, { ref, svg: checkedSvg, ...mergedProps });
    if (uncheckedSvg) return /* @__PURE__ */ jsxRuntime.jsx(Icon.InternalIcon, { ref, svg: uncheckedSvg, ...mergedProps });
    return null;
  }
);
CheckboxIndicator.displayName = "CheckboxIndicator";
const CheckboxLabel = withContext(
  withStateProps(reactPrimitive.Primitive.span),
  "label"
);
const CheckboxHiddenInput = reactCheckbox.Checkbox.HiddenInput;

exports.CheckboxControl = CheckboxControl;
exports.CheckboxGroup = CheckboxGroup;
exports.CheckboxHiddenInput = CheckboxHiddenInput;
exports.CheckboxIndicator = CheckboxIndicator;
exports.CheckboxLabel = CheckboxLabel;
exports.CheckboxRoot = CheckboxRoot;
