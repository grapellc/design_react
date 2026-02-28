'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css               */
const shared = require('./shared.cjs');

const checkboxSlotNames = [
  [
    "root",
    "seed-checkbox__root"
  ],
  [
    "label",
    "seed-checkbox__label"
  ]
];

const defaultVariant = {
  "size": "medium",
  "weight": "regular"
};

const compoundVariants = [];

const checkboxVariantMap = {
  "weight": [
    "regular",
    "bold"
  ],
  "size": [
    "large",
    "medium"
  ]
};

function checkbox(props) {
  return Object.fromEntries(
    checkboxSlotNames.map(([slot, className]) => {
      return [
        slot,
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(checkbox, { splitVariantProps: (props) => shared.splitVariantProps(props, checkboxVariantMap) });

// @recipe(seed): checkbox

exports.checkbox = checkbox;
exports.checkboxVariantMap = checkboxVariantMap;
