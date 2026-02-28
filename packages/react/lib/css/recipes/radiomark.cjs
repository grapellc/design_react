'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                */
const shared = require('./shared.cjs');

const radiomarkSlotNames = [
  [
    "root",
    "seed-radiomark__root"
  ],
  [
    "icon",
    "seed-radiomark__icon"
  ]
];

const defaultVariant = {
  "tone": "brand",
  "size": "medium"
};

const compoundVariants = [];

const radiomarkVariantMap = {
  "tone": [
    "neutral",
    "brand"
  ],
  "size": [
    "large",
    "medium"
  ]
};

function radiomark(props) {
  return Object.fromEntries(
    radiomarkSlotNames.map(([slot, className]) => {
      return [
        slot,
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(radiomark, { splitVariantProps: (props) => shared.splitVariantProps(props, radiomarkVariantMap) });

// @recipe(seed): radiomark

exports.radiomark = radiomark;
exports.radiomarkVariantMap = radiomarkVariantMap;
