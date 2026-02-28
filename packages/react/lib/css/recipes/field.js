'use client';
/* empty css          */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

const fieldSlotNames = [
  [
    "root",
    "seed-field__root"
  ],
  [
    "header",
    "seed-field__header"
  ],
  [
    "footer",
    "seed-field__footer"
  ],
  [
    "description",
    "seed-field__description"
  ],
  [
    "errorMessage",
    "seed-field__errorMessage"
  ],
  [
    "characterCountArea",
    "seed-field__characterCountArea"
  ],
  [
    "characterCount",
    "seed-field__characterCount"
  ],
  [
    "maxCharacterCount",
    "seed-field__maxCharacterCount"
  ]
];

const defaultVariant = {};

const compoundVariants = [];

const fieldVariantMap = {};

function field(props) {
  return Object.fromEntries(
    fieldSlotNames.map(([slot, className]) => {
      return [
        slot,
        createClassName(className, mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(field, { splitVariantProps: (props) => splitVariantProps(props, fieldVariantMap) });

// @recipe(seed): field

export { field, fieldVariantMap };
