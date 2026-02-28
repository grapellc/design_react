'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                        */
const shared = require('./shared.cjs');

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
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(segmentedControl, { splitVariantProps: (props) => shared.splitVariantProps(props, segmentedControlVariantMap) });

// @recipe(seed): segmented-control

exports.segmentedControl = segmentedControl;
exports.segmentedControlVariantMap = segmentedControlVariantMap;
