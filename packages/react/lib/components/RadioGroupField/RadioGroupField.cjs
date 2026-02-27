'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const field = require('@seed-design/css/recipes/field');
const fieldLabel = require('@seed-design/css/recipes/field-label');
const reactPrimitive = require('@seed-design/react-primitive');
const reactRadioGroup = require('@seed-design/react-radio-group');
const React = require('react');
const clsx = require('clsx');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');
const Icon = require('../private/Icon.cjs');

const { withProvider, withContext } = createSlotRecipeContext.createSlotRecipeContext(field.field);
const {
  withContext: withLabelContext,
  withProvider: withLabelProvider,
  useClassNames: useLabelClassNames
} = createSlotRecipeContext.createSlotRecipeContext(fieldLabel.fieldLabel);
const RadioGroupFieldRoot = withProvider(
  reactRadioGroup.RadioGroup.Root,
  "root"
);
const RadioGroupFieldHeader = withContext(
  reactPrimitive.Primitive.div,
  "header"
);
const RadioGroupFieldLabel = withLabelProvider(
  reactRadioGroup.RadioGroup.Label,
  "root"
);
const RadioGroupFieldIndicatorText = withLabelContext(reactPrimitive.Primitive.span, "indicatorText");
const RadioGroupFieldRequiredIndicator = React.forwardRef(({ className, ...props }, ref) => {
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
});
RadioGroupFieldRequiredIndicator.displayName = "RadioGroupFieldRequiredIndicator";
const RadioGroupFieldFooter = withContext(
  reactPrimitive.Primitive.div,
  "footer"
);
const RadioGroupFieldDescription = withContext(reactRadioGroup.RadioGroup.Description, "description");
const RadioGroupFieldErrorMessage = withContext(reactRadioGroup.RadioGroup.ErrorMessage, "errorMessage");

exports.RadioGroupFieldDescription = RadioGroupFieldDescription;
exports.RadioGroupFieldErrorMessage = RadioGroupFieldErrorMessage;
exports.RadioGroupFieldFooter = RadioGroupFieldFooter;
exports.RadioGroupFieldHeader = RadioGroupFieldHeader;
exports.RadioGroupFieldIndicatorText = RadioGroupFieldIndicatorText;
exports.RadioGroupFieldLabel = RadioGroupFieldLabel;
exports.RadioGroupFieldRequiredIndicator = RadioGroupFieldRequiredIndicator;
exports.RadioGroupFieldRoot = RadioGroupFieldRoot;
