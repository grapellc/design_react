'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                  */
const shared = require('./shared.cjs');

const fieldLabelSlotNames = [
  [
    "root",
    "seed-field-label__root"
  ],
  [
    "indicatorText",
    "seed-field-label__indicatorText"
  ],
  [
    "indicatorIcon",
    "seed-field-label__indicatorIcon"
  ]
];

const defaultVariant = {
  "weight": "medium"
};

const compoundVariants = [];

const fieldLabelVariantMap = {
  "weight": [
    "medium",
    "bold"
  ]
};

function fieldLabel(props) {
  return Object.fromEntries(
    fieldLabelSlotNames.map(([slot, className]) => {
      return [
        slot,
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(fieldLabel, { splitVariantProps: (props) => shared.splitVariantProps(props, fieldLabelVariantMap) });

// @recipe(seed): field-label

exports.fieldLabel = fieldLabel;
exports.fieldLabelVariantMap = fieldLabelVariantMap;
