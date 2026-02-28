'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                      */
const shared = require('./shared.cjs');

const progressCircleSlotNames = [
  [
    "root",
    "seed-progress-circle__root"
  ],
  [
    "track",
    "seed-progress-circle__track"
  ],
  [
    "range",
    "seed-progress-circle__range"
  ]
];

const defaultVariant = {
  "tone": "neutral",
  "size": 40
};

const compoundVariants = [];

const progressCircleVariantMap = {
  "tone": [
    "neutral",
    "brand",
    "staticWhite",
    "inherit"
  ],
  "size": [
    "24",
    "40",
    "inherit"
  ]
};

function progressCircle(props) {
  return Object.fromEntries(
    progressCircleSlotNames.map(([slot, className]) => {
      return [
        slot,
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(progressCircle, { splitVariantProps: (props) => shared.splitVariantProps(props, progressCircleVariantMap) });

// @recipe(seed): progress-circle

exports.progressCircle = progressCircle;
exports.progressCircleVariantMap = progressCircleVariantMap;
