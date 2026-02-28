'use client';
/* empty css                       */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

const selectBoxCheckmarkSlotNames = [
  [
    "root",
    "seed-selectBoxCheckmark__root"
  ],
  [
    "icon",
    "seed-selectBoxCheckmark__icon"
  ]
];

const defaultVariant = {};

const compoundVariants = [];

const selectBoxCheckmarkVariantMap = {};

function selectBoxCheckmark(props) {
  return Object.fromEntries(
    selectBoxCheckmarkSlotNames.map(([slot, className]) => {
      return [
        slot,
        createClassName(className, mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(selectBoxCheckmark, { splitVariantProps: (props) => splitVariantProps(props, selectBoxCheckmarkVariantMap) });

// @recipe(seed): selectBoxCheckmark

export { selectBoxCheckmark, selectBoxCheckmarkVariantMap };
