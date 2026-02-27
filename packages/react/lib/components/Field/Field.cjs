'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const reactPrimitive = require('@seed-design/react-primitive');
const reactField = require('@seed-design/react-field');
const React = require('react');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');
const createWithStateProps = require('../../utils/createWithStateProps.cjs');
const field = require('@grape-design/css/recipes/field');
const fieldLabel = require('@grape-design/css/recipes/field-label');
const Icon = require('../private/Icon.cjs');
const clsx = require('clsx');

const { withProvider, withContext, useClassNames } = createSlotRecipeContext.createSlotRecipeContext(field.field);
const {
  withContext: withLabelContext,
  withProvider: withLabelProvider,
  useClassNames: useLabelClassNames
} = createSlotRecipeContext.createSlotRecipeContext(fieldLabel.fieldLabel);
const withStateProps = createWithStateProps.createWithStateProps([reactField.useFieldContext]);
const FieldRoot = withProvider(reactField.Field.Root, "root");
const FieldHeader = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "header"
);
const FieldLabel = withLabelProvider(reactField.Field.Label, "root");
const FieldIndicatorText = withLabelContext(
  withStateProps(reactPrimitive.Primitive.span),
  "indicatorText"
);
const FieldRequiredIndicator = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { indicatorIcon } = useLabelClassNames();
    return /* @__PURE__ */ jsxRuntime.jsx(
      Icon.InternalIcon,
      {
        svg: (
          // biome-ignore lint/a11y/noSvgWithoutTitle: InternalIcon is aria-hidden
          /* @__PURE__ */ jsxRuntime.jsx(
            "svg",
            {
              viewBox: "0 0 6 6",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              className: clsx(indicatorIcon, className),
              children: /* @__PURE__ */ jsxRuntime.jsx(
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
  withStateProps(reactPrimitive.Primitive.div),
  "footer"
);
const FieldDescription = withContext(
  reactField.Field.Description,
  "description"
);
const FieldErrorMessage = withContext(
  reactField.Field.ErrorMessage,
  "errorMessage"
);
const FieldCharacterCount = React.forwardRef(
  ({ current, max, className, ...otherProps }, ref) => {
    const classNames = useClassNames();
    const { stateProps } = reactField.useFieldContext();
    return /* @__PURE__ */ jsxRuntime.jsxs(
      reactPrimitive.Primitive.div,
      {
        className: clsx(classNames.characterCountArea, className),
        ref,
        ...otherProps,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              ...current === 0 ? { "data-empty": true } : {},
              ...current > max ? { "data-exceeded": true } : {},
              className: classNames.characterCount,
              ...stateProps,
              children: current
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs("span", { className: classNames.maxCharacterCount, ...stateProps, children: [
            "/",
            max
          ] })
        ]
      }
    );
  }
);

exports.FieldCharacterCount = FieldCharacterCount;
exports.FieldDescription = FieldDescription;
exports.FieldErrorMessage = FieldErrorMessage;
exports.FieldFooter = FieldFooter;
exports.FieldHeader = FieldHeader;
exports.FieldIndicatorText = FieldIndicatorText;
exports.FieldLabel = FieldLabel;
exports.FieldRequiredIndicator = FieldRequiredIndicator;
exports.FieldRoot = FieldRoot;
