'use client';
/* empty css             */
import { createClassName, mergeVariants, splitVariantProps } from './shared.js';

const checkboxSlotNames = [
  [
    "root",
    "seed-checkbox__root"
  ],
  [
    "label",
    "seed-checkbox__label"
  ]
];

const defaultVariant = {
  "size": "medium",
  "weight": "regular"
};

const compoundVariants = [];

const checkboxVariantMap = {
  "weight": [
    "regular",
    "bold"
  ],
  "size": [
    "large",
    "medium"
  ]
};

function checkbox(props) {
  return Object.fromEntries(
    checkboxSlotNames.map(([slot, className]) => {
      return [
        slot,
        createClassName(className, mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(checkbox, { splitVariantProps: (props) => splitVariantProps(props, checkboxVariantMap) });

// @recipe(seed): checkbox

export { checkbox, checkboxVariantMap };
