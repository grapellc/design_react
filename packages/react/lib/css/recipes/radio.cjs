'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css            */
const shared = require('./shared.cjs');

const radioSlotNames = [
  [
    "root",
    "seed-radio__root"
  ],
  [
    "label",
    "seed-radio__label"
  ]
];

const defaultVariant = {
  "size": "medium",
  "weight": "regular"
};

const compoundVariants = [];

const radioVariantMap = {
  "weight": [
    "regular",
    "bold"
  ],
  "size": [
    "large",
    "medium"
  ]
};

function radio(props) {
  return Object.fromEntries(
    radioSlotNames.map(([slot, className]) => {
      return [
        slot,
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(radio, { splitVariantProps: (props) => shared.splitVariantProps(props, radioVariantMap) });

// @recipe(seed): radio

exports.radio = radio;
exports.radioVariantMap = radioVariantMap;
