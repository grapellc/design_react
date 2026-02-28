'use client';
/* empty css              */
import { createClassName, mergeVariants, splitVariantProps } from './shared.js';

const checkmarkSlotNames = [
  [
    "root",
    "seed-checkmark__root"
  ],
  [
    "icon",
    "seed-checkmark__icon"
  ]
];

const defaultVariant = {
  "variant": "square",
  "tone": "brand",
  "size": "medium"
};

const compoundVariants = [
  {
    "variant": "square",
    "tone": "neutral"
  },
  {
    "variant": "square",
    "tone": "brand"
  },
  {
    "variant": "ghost",
    "tone": "neutral"
  },
  {
    "variant": "ghost",
    "tone": "brand"
  },
  {
    "size": "medium",
    "variant": "ghost"
  },
  {
    "size": "large",
    "variant": "ghost"
  },
  {
    "size": "medium",
    "variant": "square"
  },
  {
    "size": "large",
    "variant": "square"
  }
];

const checkmarkVariantMap = {
  "variant": [
    "square",
    "ghost"
  ],
  "tone": [
    "neutral",
    "brand"
  ],
  "size": [
    "large",
    "medium"
  ]
};

function checkmark(props) {
  return Object.fromEntries(
    checkmarkSlotNames.map(([slot, className]) => {
      return [
        slot,
        createClassName(className, mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(checkmark, { splitVariantProps: (props) => splitVariantProps(props, checkmarkVariantMap) });

// @recipe(seed): checkmark

export { checkmark, checkmarkVariantMap };
