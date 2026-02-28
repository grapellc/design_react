'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                 */
const shared = require('./shared.cjs');

const switchmarkSlotNames = [
  [
    "root",
    "seed-switchmark__root"
  ],
  [
    "thumb",
    "seed-switchmark__thumb"
  ]
];

const defaultVariant = {
  "tone": "brand",
  "size": 32
};

const compoundVariants = [];

const switchmarkVariantMap = {
  "tone": [
    "neutral",
    "brand"
  ],
  "size": [
    "16",
    "24",
    "32"
  ]
};

function switchmark(props) {
  return Object.fromEntries(
    switchmarkSlotNames.map(([slot, className]) => {
      return [
        slot,
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(switchmark, { splitVariantProps: (props) => shared.splitVariantProps(props, switchmarkVariantMap) });

// @recipe(seed): switchmark

exports.switchmark = switchmark;
exports.switchmarkVariantMap = switchmarkVariantMap;
