'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const reactSwitch = require('@seed-design/react-switch');
const _switch = require('@grape-design/css/recipes/switch');
const switchmark = require('@grape-design/css/recipes/switchmark');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');
const reactPrimitive = require('@seed-design/react-primitive');
const createWithStateProps = require('../../utils/createWithStateProps.cjs');
const React = require('react');
const clsx = require('clsx');
const splitMultipleVariantsProps = require('../../utils/splitMultipleVariantsProps.cjs');

const { withContext, ClassNamesProvider } = createSlotRecipeContext.createSlotRecipeContext(_switch.switchStyle);
const {
  withContext: withControlContext,
  PropsProvider: ControlPropsProvider,
  withProvider: withControlProvider
} = createSlotRecipeContext.createSlotRecipeContext(switchmark.switchmark);
const withStateProps = createWithStateProps.createWithStateProps([reactSwitch.useSwitchContext]);
const SwitchRoot = React.forwardRef(
  ({ className, ...props }, ref) => {
    if (process.env.NODE_ENV !== "production" && (props.size === "small" || props.size === "medium")) {
      console.warn(
        `[SEED Design System] Switch size='${props.size}' is deprecated and will be removed in @seed-design/react@1.3.0. Use size='${props.size === "small" ? "16" : "32"}' instead.`
      );
    }
    const [{ switch: switchVariantProps, switchmark: switchmarkVariantProps }, otherProps] = splitMultipleVariantsProps.splitMultipleVariantsProps(
      {
        ...props,
        // TODO: replace this mapping completely
        size: props.size === "small" ? "16" : props.size === "medium" ? "32" : props.size
      },
      { switchmark: switchmark.switchmark, switch: _switch.switchStyle }
    );
    const classNames = _switch.switchStyle(switchVariantProps);
    return /* @__PURE__ */ jsxRuntime.jsx(ControlPropsProvider, { value: switchmarkVariantProps, children: /* @__PURE__ */ jsxRuntime.jsx(ClassNamesProvider, { value: classNames, children: /* @__PURE__ */ jsxRuntime.jsx(
      reactSwitch.Switch.Root,
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
  reactSwitch.Switch.Control,
  "root"
);
const SwitchThumb = withControlContext(
  reactSwitch.Switch.Thumb,
  "thumb"
);
const SwitchLabel = withContext(
  withStateProps(reactPrimitive.Primitive.span),
  "label"
);
const SwitchHiddenInput = reactSwitch.Switch.HiddenInput;

exports.SwitchControl = SwitchControl;
exports.SwitchHiddenInput = SwitchHiddenInput;
exports.SwitchLabel = SwitchLabel;
exports.SwitchRoot = SwitchRoot;
exports.SwitchThumb = SwitchThumb;
