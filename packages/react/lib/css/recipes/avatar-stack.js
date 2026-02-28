'use client';
/* empty css                 */
import { createClassName, mergeVariants, splitVariantProps } from './shared.js';

const avatarStackSlotNames = [
  [
    "root",
    "seed-avatar-stack__root"
  ],
  [
    "item",
    "seed-avatar-stack__item"
  ]
];

const defaultVariant = {
  "size": 48
};

const compoundVariants = [];

const avatarStackVariantMap = {
  "size": [
    "20",
    "24",
    "36",
    "42",
    "48",
    "64",
    "80",
    "96",
    "108"
  ]
};

function avatarStack(props) {
  return Object.fromEntries(
    avatarStackSlotNames.map(([slot, className]) => {
      return [
        slot,
        createClassName(className, mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(avatarStack, { splitVariantProps: (props) => splitVariantProps(props, avatarStackVariantMap) });

// @recipe(seed): avatar-stack

export { avatarStack, avatarStackVariantMap };
