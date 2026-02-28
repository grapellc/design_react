'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                 */
const shared = require('./shared.cjs');

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
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(textInput, { splitVariantProps: (props) => shared.splitVariantProps(props, textInputVariantMap) });

// @recipe(seed): text-input

exports.textInput = textInput;
exports.textInputVariantMap = textInputVariantMap;
