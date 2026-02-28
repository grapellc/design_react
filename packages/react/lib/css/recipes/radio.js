'use client';
/* empty css          */
import { createClassName, mergeVariants, splitVariantProps } from './shared.js';

const radioSlotNames = [
  [
    "root",
    "seed-radio__root"
  ],
  [
    "label",
    "seed-radio__label"
  ]
];

const defaultVariant = {
  "size": "medium",
  "weight": "regular"
};

const compoundVariants = [];

const radioVariantMap = {
  "weight": [
    "regular",
    "bold"
  ],
  "size": [
    "large",
    "medium"
  ]
};

function radio(props) {
  return Object.fromEntries(
    radioSlotNames.map(([slot, className]) => {
      return [
        slot,
        createClassName(className, mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(radio, { splitVariantProps: (props) => splitVariantProps(props, radioVariantMap) });

// @recipe(seed): radio

export { radio, radioVariantMap };
