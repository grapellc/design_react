'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                   */
const shared = require('./shared.cjs');

const defaultVariant = {
  "size": "medium",
  "layout": "withText"
};

const compoundVariants = [
  {
    "size": "medium",
    "layout": "withText"
  },
  {
    "size": "medium",
    "layout": "iconOnly"
  },
  {
    "size": "small",
    "layout": "withText"
  },
  {
    "size": "small",
    "layout": "iconOnly"
  }
];

const controlChipVariantMap = {
  "size": [
    "medium",
    "small"
  ],
  "layout": [
    "withText",
    "iconOnly"
  ]
};

function controlChip(props) {
  return shared.createClassName(
    "seed-control-chip",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(controlChip, { splitVariantProps: (props) => shared.splitVariantProps(props, controlChipVariantMap) });

// @recipe(seed): control-chip

exports.controlChip = controlChip;
exports.controlChipVariantMap = controlChipVariantMap;
