'use client';
/* empty css           */
import { createClassName, mergeVariants, splitVariantProps } from './shared.js';

const switchSlotNames = [
  [
    "root",
    "seed-switch__root"
  ],
  [
    "label",
    "seed-switch__label"
  ]
];

const defaultVariant = {
  "size": 32
};

const compoundVariants = [];

const switchVariantMap = {
  "size": [
    "16",
    "24",
    "32"
  ]
};

function switchStyle(props) {
  return Object.fromEntries(
    switchSlotNames.map(([slot, className]) => {
      return [
        slot,
        createClassName(className, mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(switchStyle, { splitVariantProps: (props) => splitVariantProps(props, switchVariantMap) });

// @recipe(seed): switch

export { switchStyle, switchVariantMap };
