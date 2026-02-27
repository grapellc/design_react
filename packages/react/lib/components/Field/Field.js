'use client';
import { jsxs, jsx } from 'react/jsx-runtime';
import { Primitive } from '@seed-design/react-primitive';
import { useFieldContext, Field } from '@seed-design/react-field';
import { forwardRef } from 'react';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';
import { createWithStateProps } from '../../utils/createWithStateProps.js';
import { field } from '@seed-design/css/recipes/field';
import { fieldLabel } from '@seed-design/css/recipes/field-label';
import { InternalIcon } from '../private/Icon.js';
import clsx from 'clsx';

const { withProvider, withContext, useClassNames } = createSlotRecipeContext(field);
const {
  withContext: withLabelContext,
  withProvider: withLabelProvider,
  useClassNames: useLabelClassNames
} = createSlotRecipeContext(fieldLabel);
const withStateProps = createWithStateProps([useFieldContext]);
const FieldRoot = withProvider(Field.Root, "root");
const FieldHeader = withContext(
  withStateProps(Primitive.div),
  "header"
);
const FieldLabel = withLabelProvider(Field.Label, "root");
const FieldIndicatorText = withLabelContext(
  withStateProps(Primitive.span),
  "indicatorText"
);
const FieldRequiredIndicator = forwardRef(
  ({ className, ...props }, ref) => {
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
  }
);
const FieldFooter = withContext(
  withStateProps(Primitive.div),
  "footer"
);
const FieldDescription = withContext(
  Field.Description,
  "description"
);
const FieldErrorMessage = withContext(
  Field.ErrorMessage,
  "errorMessage"
);
const FieldCharacterCount = forwardRef(
  ({ current, max, className, ...otherProps }, ref) => {
    const classNames = useClassNames();
    const { stateProps } = useFieldContext();
    return /* @__PURE__ */ jsxs(
      Primitive.div,
      {
        className: clsx(classNames.characterCountArea, className),
        ref,
        ...otherProps,
        children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              ...current === 0 ? { "data-empty": true } : {},
              ...current > max ? { "data-exceeded": true } : {},
              className: classNames.characterCount,
              ...stateProps,
              children: current
            }
          ),
          /* @__PURE__ */ jsxs("span", { className: classNames.maxCharacterCount, ...stateProps, children: [
            "/",
            max
          ] })
        ]
      }
    );
  }
);

export { FieldCharacterCount, FieldDescription, FieldErrorMessage, FieldFooter, FieldHeader, FieldIndicatorText, FieldLabel, FieldRequiredIndicator, FieldRoot };
