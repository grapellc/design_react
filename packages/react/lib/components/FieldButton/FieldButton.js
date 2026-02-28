'use client';
import { jsx } from 'react/jsx-runtime';
import { Primitive } from '@grape-design/react-primitive';
import { FieldButton, useFieldButtonContext } from '@grape-design/react-field-button';
import * as React from 'react';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';
import { createWithStateProps } from '../../utils/createWithStateProps.js';
import { field } from '@grape-design/css/recipes/field';
import { fieldLabel } from '@grape-design/css/recipes/field-label';
import { InternalIcon } from '../private/Icon.js';
import { inputButton } from '@grape-design/css/recipes/input-button';
import clsx from 'clsx';

const { withContext: withFieldContext, withProvider: withFieldProvider } = createSlotRecipeContext(field);
const { withProvider, withContext, useClassNames } = createSlotRecipeContext(inputButton);
const {
  withProvider: withLabelProvider,
  withContext: withLabelContext,
  useClassNames: useLabelClassNames
} = createSlotRecipeContext(fieldLabel);
const withStateProps = createWithStateProps([useFieldButtonContext]);
const FieldButtonRoot = withFieldProvider(
  FieldButton.Root,
  "root"
);
const FieldButtonHeader = withFieldContext(
  withStateProps(Primitive.div),
  "header"
);
const FieldButtonLabel = withLabelProvider(
  withStateProps(Primitive.div),
  "root"
);
const FieldButtonIndicatorText = withLabelContext(withStateProps(Primitive.span), "indicatorText");
const FieldButtonRequiredIndicator = React.forwardRef(({ className, ...props }, ref) => {
  const { indicatorIcon } = useLabelClassNames();
  return /* @__PURE__ */ jsx(
    InternalIcon,
    {
      svg: (
        // biome-ignore lint/a11y/noSvgWithoutTitle: InternalIcon is aria-hidden
        /* @__PURE__ */ jsx(
          "svg",
          {
            viewBox: "0 0 6 6",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: clsx(indicatorIcon, className),
            children: /* @__PURE__ */ jsx(
              "path",
              {
                d: "M3.75002 1.55859L4.41318 1.09468C4.75243 0.857361 5.21982 0.939865 5.45732 1.27899C5.69499 1.61836 5.61243 2.08615 5.27295 2.32366L4.30763 2.99902L5.27372 3.67612C5.61285 3.91381 5.69517 4.38137 5.45761 4.72059C5.21999 5.0599 4.7523 5.14233 4.41299 4.90471L3.75002 4.44043V5.25C3.75002 5.66421 3.41423 6 3.00002 6C2.5858 6 2.25002 5.66421 2.25002 5.25V4.44043L1.58704 4.90471C1.24773 5.14233 0.780041 5.0599 0.542418 4.72059C0.304856 4.38137 0.387176 3.91381 0.726309 3.67612L1.6924 2.99902L0.727079 2.32366C0.387603 2.08615 0.305043 1.61836 0.542707 1.27899C0.780206 0.939865 1.2476 0.857361 1.58685 1.09468L2.25002 1.55859V0.75C2.25002 0.335786 2.5858 0 3.00002 0C3.41423 0 3.75002 0.335786 3.75002 0.75V1.55859Z",
                fill: "currentColor"
              }
            )
          }
        )
      ),
      ref,
      ...props
    }
  );
});
FieldButtonRequiredIndicator.displayName = "FieldButtonRequiredIndicator";
const FieldButtonPrefixIcon = withContext(
  withStateProps(InternalIcon),
  "prefixIcon"
);
const FieldButtonPrefixText = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { stateProps } = useFieldButtonContext();
    const { prefixText } = useClassNames();
    return /* @__PURE__ */ jsx(
      Primitive.span,
      {
        className: clsx(prefixText, className),
        ref,
        "aria-hidden": true,
        ...stateProps,
        ...props
      }
    );
  }
);
FieldButtonPrefixText.displayName = "FieldButtonPrefixText";
const FieldButtonSuffixIcon = withContext(
  withStateProps(InternalIcon),
  "suffixIcon"
);
const FieldButtonSuffixText = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { stateProps } = useFieldButtonContext();
    const { suffixText } = useClassNames();
    return /* @__PURE__ */ jsx(
      Primitive.span,
      {
        className: clsx(suffixText, className),
        ref,
        "aria-hidden": true,
        ...stateProps,
        ...props
      }
    );
  }
);
FieldButtonSuffixText.displayName = "FieldButtonSuffixText";
const FieldButtonFooter = withFieldContext(
  withStateProps(Primitive.div),
  "footer"
);
const FieldButtonDescription = withFieldContext(FieldButton.Description, "description");
const FieldButtonErrorMessage = withFieldContext(FieldButton.ErrorMessage, "errorMessage");
const FieldButtonHiddenInput = FieldButton.HiddenInput;
const FieldButtonButton = withContext(
  FieldButton.Button,
  "button"
);
const FieldButtonControl = withProvider(
  withStateProps(Primitive.div),
  "root"
);
const FieldButtonClearButton = withContext(
  FieldButton.ClearButton,
  "clearButton"
);
const FieldButtonValue = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { stateProps } = useFieldButtonContext();
    const { value } = useClassNames();
    return /* @__PURE__ */ jsx(
      Primitive.div,
      {
        className: clsx(value, className),
        ref,
        "aria-hidden": true,
        ...stateProps,
        ...props
      }
    );
  }
);
FieldButtonValue.displayName = "FieldButtonValue";
const FieldButtonPlaceholder = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { stateProps } = useFieldButtonContext();
    const { placeholder } = useClassNames();
    return /* @__PURE__ */ jsx(
      Primitive.div,
      {
        className: clsx(placeholder, className),
        ref,
        "aria-hidden": true,
        ...stateProps,
        ...props
      }
    );
  }
);
FieldButtonPlaceholder.displayName = "FieldButtonPlaceholder";

export { FieldButtonButton, FieldButtonClearButton, FieldButtonControl, FieldButtonDescription, FieldButtonErrorMessage, FieldButtonFooter, FieldButtonHeader, FieldButtonHiddenInput, FieldButtonIndicatorText, FieldButtonLabel, FieldButtonPlaceholder, FieldButtonPrefixIcon, FieldButtonPrefixText, FieldButtonRequiredIndicator, FieldButtonRoot, FieldButtonSuffixIcon, FieldButtonSuffixText, FieldButtonValue };
