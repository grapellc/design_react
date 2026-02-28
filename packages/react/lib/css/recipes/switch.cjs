'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css             */
const shared = require('./shared.cjs');

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
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(switchStyle, { splitVariantProps: (props) => shared.splitVariantProps(props, switchVariantMap) });

// @recipe(seed): switch

exports.switchStyle = switchStyle;
exports.switchVariantMap = switchVariantMap;
