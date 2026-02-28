'use client';
/* empty css         */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

const chipSlotNames = [
  [
    "root",
    "seed-chip__root"
  ],
  [
    "label",
    "seed-chip__label"
  ],
  [
    "prefixIcon",
    "seed-chip__prefixIcon"
  ],
  [
    "suffixIcon",
    "seed-chip__suffixIcon"
  ],
  [
    "prefixAvatar",
    "seed-chip__prefixAvatar"
  ]
];

const defaultVariant = {
  "variant": "solid",
  "size": "medium",
  "layout": "withText"
};

const compoundVariants = [
  {
    "size": "small",
    "layout": "iconOnly"
  },
  {
    "size": "medium",
    "layout": "iconOnly"
  },
  {
    "size": "large",
    "layout": "iconOnly"
  }
];

const chipVariantMap = {
  "variant": [
    "solid",
    "outlineStrong",
    "outlineWeak"
  ],
  "size": [
    "large",
    "medium",
    "small"
  ],
  "layout": [
    "iconOnly",
    "withText"
  ]
};

function chip(props) {
  return Object.fromEntries(
    chipSlotNames.map(([slot, className]) => {
      return [
        slot,
        createClassName(className, mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(chip, { splitVariantProps: (props) => splitVariantProps(props, chipVariantMap) });

// @recipe(seed): chip

export { chip, chipVariantMap };
