'use client';
/* empty css               */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

const textInputSlotNames = [
  [
    "root",
    "seed-text-input__root"
  ],
  [
    "value",
    "seed-text-input__value"
  ],
  [
    "prefixText",
    "seed-text-input__prefixText"
  ],
  [
    "prefixIcon",
    "seed-text-input__prefixIcon"
  ],
  [
    "suffixText",
    "seed-text-input__suffixText"
  ],
  [
    "suffixIcon",
    "seed-text-input__suffixIcon"
  ]
];

const defaultVariant = {
  "variant": "outline",
  "size": "large"
};

const compoundVariants = [
  {
    "variant": "outline",
    "size": "large"
  },
  {
    "variant": "outline",
    "size": "medium"
  }
];

const textInputVariantMap = {
  "variant": [
    "outline",
    "underline"
  ],
  "size": [
    "large",
    "medium"
  ]
};

function textInput(props) {
  return Object.fromEntries(
    textInputSlotNames.map(([slot, className]) => {
      return [
        slot,
        createClassName(className, mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(textInput, { splitVariantProps: (props) => splitVariantProps(props, textInputVariantMap) });

// @recipe(seed): text-input

export { textInput, textInputVariantMap };
