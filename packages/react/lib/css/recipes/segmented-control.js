'use client';
/* empty css                      */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

const segmentedControlSlotNames = [
  [
    "root",
    "seed-segmented-control__root"
  ],
  [
    "indicator",
    "seed-segmented-control__indicator"
  ],
  [
    "item",
    "seed-segmented-control__item"
  ]
];

const defaultVariant = {};

const compoundVariants = [];

const segmentedControlVariantMap = {};

function segmentedControl(props) {
  return Object.fromEntries(
    segmentedControlSlotNames.map(([slot, className]) => {
      return [
        slot,
        createClassName(className, mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(segmentedControl, { splitVariantProps: (props) => splitVariantProps(props, segmentedControlVariantMap) });

// @recipe(seed): segmented-control

export { segmentedControl, segmentedControlVariantMap };
