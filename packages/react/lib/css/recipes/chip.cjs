'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css           */
const shared = require('./shared.cjs');

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
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(chip, { splitVariantProps: (props) => shared.splitVariantProps(props, chipVariantMap) });

// @recipe(seed): chip

exports.chip = chip;
exports.chipVariantMap = chipVariantMap;
