'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                   */
const shared = require('./shared.cjs');

const inputButtonSlotNames = [
  [
    "root",
    "seed-input-button__root"
  ],
  [
    "value",
    "seed-input-button__value"
  ],
  [
    "placeholder",
    "seed-input-button__placeholder"
  ],
  [
    "button",
    "seed-input-button__button"
  ],
  [
    "prefixText",
    "seed-input-button__prefixText"
  ],
  [
    "prefixIcon",
    "seed-input-button__prefixIcon"
  ],
  [
    "suffixText",
    "seed-input-button__suffixText"
  ],
  [
    "suffixIcon",
    "seed-input-button__suffixIcon"
  ],
  [
    "clearButton",
    "seed-input-button__clearButton"
  ]
];

const defaultVariant = {};

const compoundVariants = [];

const inputButtonVariantMap = {};

function inputButton(props) {
  return Object.fromEntries(
    inputButtonSlotNames.map(([slot, className]) => {
      return [
        slot,
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(inputButton, { splitVariantProps: (props) => shared.splitVariantProps(props, inputButtonVariantMap) });

// @recipe(seed): input-button

exports.inputButton = inputButton;
exports.inputButtonVariantMap = inputButtonVariantMap;
