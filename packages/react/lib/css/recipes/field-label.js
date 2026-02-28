'use client';
/* empty css                */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

const fieldLabelSlotNames = [
  [
    "root",
    "seed-field-label__root"
  ],
  [
    "indicatorText",
    "seed-field-label__indicatorText"
  ],
  [
    "indicatorIcon",
    "seed-field-label__indicatorIcon"
  ]
];

const defaultVariant = {
  "weight": "medium"
};

const compoundVariants = [];

const fieldLabelVariantMap = {
  "weight": [
    "medium",
    "bold"
  ]
};

function fieldLabel(props) {
  return Object.fromEntries(
    fieldLabelSlotNames.map(([slot, className]) => {
      return [
        slot,
        createClassName(className, mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(fieldLabel, { splitVariantProps: (props) => splitVariantProps(props, fieldLabelVariantMap) });

// @recipe(seed): field-label

export { fieldLabel, fieldLabelVariantMap };
