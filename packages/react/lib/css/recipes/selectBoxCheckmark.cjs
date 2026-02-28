'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                         */
const shared = require('./shared.cjs');

const selectBoxCheckmarkSlotNames = [
  [
    "root",
    "seed-selectBoxCheckmark__root"
  ],
  [
    "icon",
    "seed-selectBoxCheckmark__icon"
  ]
];

const defaultVariant = {};

const compoundVariants = [];

const selectBoxCheckmarkVariantMap = {};

function selectBoxCheckmark(props) {
  return Object.fromEntries(
    selectBoxCheckmarkSlotNames.map(([slot, className]) => {
      return [
        slot,
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(selectBoxCheckmark, { splitVariantProps: (props) => shared.splitVariantProps(props, selectBoxCheckmarkVariantMap) });

// @recipe(seed): selectBoxCheckmark

exports.selectBoxCheckmark = selectBoxCheckmark;
exports.selectBoxCheckmarkVariantMap = selectBoxCheckmarkVariantMap;
