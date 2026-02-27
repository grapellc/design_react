'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const reactUseLayoutEffect = require('@radix-ui/react-use-layout-effect');
const reactPrimitive = require('@seed-design/react-primitive');
const reactTextField = require('@seed-design/react-text-field');
const reactField = require('@seed-design/react-field');
const textInput = require('@grape-design/css/recipes/text-input');
const clsx = require('clsx');
const React = require('react');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');
const createWithStateProps = require('../../utils/createWithStateProps.cjs');
const Icon = require('../private/Icon.cjs');
const reactComposeRefs = require('@radix-ui/react-compose-refs');
const domUtils = require('@seed-design/dom-utils');

const { withProvider, withContext, useClassNames } = createSlotRecipeContext.createSlotRecipeContext(textInput.textInput);
const withFieldStateProps = createWithStateProps.createWithStateProps([{ useContext: reactField.useFieldContext, strict: false }]);
const withStateProps = createWithStateProps.createWithStateProps([
  reactTextField.useTextFieldContext,
  { useContext: reactField.useFieldContext, strict: false }
]);
const TextFieldRoot = withProvider(
  withFieldStateProps(reactTextField.TextField.Root),
  "root"
);
const TextFieldPrefixIcon = withContext(
  withStateProps(Icon.InternalIcon),
  "prefixIcon"
);
const TextFieldPrefixText = withContext(
  withStateProps(reactPrimitive.Primitive.span),
  "prefixText"
);
const TextFieldSuffixIcon = withContext(
  withStateProps(Icon.InternalIcon),
  "suffixIcon"
);
const TextFieldSuffixText = withContext(
  withStateProps(reactPrimitive.Primitive.span),
  "suffixText"
);
const TextFieldInput = React.forwardRef(
  ({ className, ...otherProps }, ref) => {
    const classNames = useClassNames();
    const textFieldContext = reactTextField.useTextFieldContext();
    const fieldContext = reactField.useFieldContext({ strict: false });
    const mergedProps = domUtils.mergeProps(
      fieldContext ? fieldContext.stateProps : {},
      fieldContext ? fieldContext.inputAriaAttributes : {},
      textFieldContext.inputProps,
      fieldContext ? fieldContext.inputProps : {},
      otherProps
    );
    if (
      // if not in field, then must have aria-label or aria-labelledby
      !fieldContext && !otherProps["aria-label"] && !otherProps["aria-labelledby"]
    ) {
      console.warn(
        "TextFieldInput: Please provide `aria-label` or `aria-labelledby` for accessibility, or put `TextFieldInput` inside a `Field` where a `FieldLabel` is provided."
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsx(reactTextField.TextField.Input, { ref, ...mergedProps, className: clsx(classNames.value, className) });
  }
);
TextFieldInput.displayName = "TextFieldInput";
const TextFieldTextarea = React.forwardRef(
  ({ className, autoresize = true, ...otherProps }, ref) => {
    const classNames = useClassNames();
    const textFieldContext = reactTextField.useTextFieldContext();
    const fieldContext = reactField.useFieldContext({ strict: false });
    const mergedProps = domUtils.mergeProps(
      fieldContext ? fieldContext.stateProps : {},
      fieldContext ? fieldContext.inputAriaAttributes : {},
      textFieldContext.inputProps,
      fieldContext ? fieldContext.inputProps : {},
      otherProps
    );
    if (
      // if not in field, then must have aria-label or aria-labelledby
      !fieldContext && !otherProps["aria-label"] && !otherProps["aria-labelledby"]
    ) {
      console.warn(
        "TextFieldTextarea: Please provide `aria-label` or `aria-labelledby` for accessibility, or put `TextFieldTextarea` inside a `Field` where a `FieldLabel` is provided."
      );
    }
    const inputRef = React.useRef(null);
    const onHeightChange = React.useCallback(() => {
      if (!inputRef.current) return;
      if (otherProps.style?.height) return;
      if (!autoresize) return;
      const input = inputRef.current;
      const prevAlignment = input.style.alignSelf;
      const prevOverflow = input.style.overflow;
      const isFirefox = "MozAppearance" in input.style;
      if (!isFirefox) {
        input.style.overflow = "hidden";
      }
      input.style.alignSelf = "start";
      input.style.height = "auto";
      input.style.height = `${input.scrollHeight + (input.offsetHeight - input.clientHeight)}px`;
      input.style.overflow = prevOverflow;
      input.style.alignSelf = prevAlignment;
    }, [inputRef, otherProps.style?.height, autoresize]);
    reactUseLayoutEffect.useLayoutEffect(() => {
      if (inputRef.current) {
        onHeightChange();
      }
    }, [onHeightChange, textFieldContext.value, inputRef]);
    return /* @__PURE__ */ jsxRuntime.jsx(
      reactTextField.TextField.Textarea,
      {
        ref: reactComposeRefs.composeRefs(inputRef, ref),
        ...mergedProps,
        className: clsx(classNames.value, className)
      }
    );
  }
);
TextFieldTextarea.displayName = "TextFieldTextarea";

exports.TextFieldInput = TextFieldInput;
exports.TextFieldPrefixIcon = TextFieldPrefixIcon;
exports.TextFieldPrefixText = TextFieldPrefixText;
exports.TextFieldRoot = TextFieldRoot;
exports.TextFieldSuffixIcon = TextFieldSuffixIcon;
exports.TextFieldSuffixText = TextFieldSuffixText;
exports.TextFieldTextarea = TextFieldTextarea;
