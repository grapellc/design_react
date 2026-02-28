'use client';
/* empty css              */
import { createClassName, mergeVariants, splitVariantProps } from './shared.js';

const radiomarkSlotNames = [
  [
    "root",
    "seed-radiomark__root"
  ],
  [
    "icon",
    "seed-radiomark__icon"
  ]
];

const defaultVariant = {
  "tone": "brand",
  "size": "medium"
};

const compoundVariants = [];

const radiomarkVariantMap = {
  "tone": [
    "neutral",
    "brand"
  ],
  "size": [
    "large",
    "medium"
  ]
};

function radiomark(props) {
  return Object.fromEntries(
    radiomarkSlotNames.map(([slot, className]) => {
      return [
        slot,
        createClassName(className, mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(radiomark, { splitVariantProps: (props) => splitVariantProps(props, radiomarkVariantMap) });

// @recipe(seed): radiomark

export { radiomark, radiomarkVariantMap };
