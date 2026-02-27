'use client';
import { jsx } from 'react/jsx-runtime';
import { useLayoutEffect } from '@radix-ui/react-use-layout-effect';
import { Primitive } from '@seed-design/react-primitive';
import { useTextFieldContext, TextField } from '@seed-design/react-text-field';
import { useFieldContext } from '@seed-design/react-field';
import { textInput } from '@grape-design/css/recipes/text-input';
import clsx from 'clsx';
import { forwardRef, useRef, useCallback } from 'react';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';
import { createWithStateProps } from '../../utils/createWithStateProps.js';
import { InternalIcon } from '../private/Icon.js';
import { composeRefs } from '@radix-ui/react-compose-refs';
import { mergeProps } from '@seed-design/dom-utils';

const { withProvider, withContext, useClassNames } = createSlotRecipeContext(textInput);
const withFieldStateProps = createWithStateProps([{ useContext: useFieldContext, strict: false }]);
const withStateProps = createWithStateProps([
  useTextFieldContext,
  { useContext: useFieldContext, strict: false }
]);
const TextFieldRoot = withProvider(
  withFieldStateProps(TextField.Root),
  "root"
);
const TextFieldPrefixIcon = withContext(
  withStateProps(InternalIcon),
  "prefixIcon"
);
const TextFieldPrefixText = withContext(
  withStateProps(Primitive.span),
  "prefixText"
);
const TextFieldSuffixIcon = withContext(
  withStateProps(InternalIcon),
  "suffixIcon"
);
const TextFieldSuffixText = withContext(
  withStateProps(Primitive.span),
  "suffixText"
);
const TextFieldInput = forwardRef(
  ({ className, ...otherProps }, ref) => {
    const classNames = useClassNames();
    const textFieldContext = useTextFieldContext();
    const fieldContext = useFieldContext({ strict: false });
    const mergedProps = mergeProps(
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
    return /* @__PURE__ */ jsx(TextField.Input, { ref, ...mergedProps, className: clsx(classNames.value, className) });
  }
);
TextFieldInput.displayName = "TextFieldInput";
const TextFieldTextarea = forwardRef(
  ({ className, autoresize = true, ...otherProps }, ref) => {
    const classNames = useClassNames();
    const textFieldContext = useTextFieldContext();
    const fieldContext = useFieldContext({ strict: false });
    const mergedProps = mergeProps(
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
    const inputRef = useRef(null);
    const onHeightChange = useCallback(() => {
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
    useLayoutEffect(() => {
      if (inputRef.current) {
        onHeightChange();
      }
    }, [onHeightChange, textFieldContext.value, inputRef]);
    return /* @__PURE__ */ jsx(
      TextField.Textarea,
      {
        ref: composeRefs(inputRef, ref),
        ...mergedProps,
        className: clsx(classNames.value, className)
      }
    );
  }
);
TextFieldTextarea.displayName = "TextFieldTextarea";

export { TextFieldInput, TextFieldPrefixIcon, TextFieldPrefixText, TextFieldRoot, TextFieldSuffixIcon, TextFieldSuffixText, TextFieldTextarea };
