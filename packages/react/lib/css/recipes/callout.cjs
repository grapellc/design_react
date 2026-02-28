'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css              */
const shared = require('./shared.cjs');

const calloutSlotNames = [
  [
    "root",
    "seed-callout__root"
  ],
  [
    "content",
    "seed-callout__content"
  ],
  [
    "title",
    "seed-callout__title"
  ],
  [
    "description",
    "seed-callout__description"
  ],
  [
    "link",
    "seed-callout__link"
  ],
  [
    "closeButton",
    "seed-callout__closeButton"
  ]
];

const defaultVariant = {
  "tone": "neutral"
};

const compoundVariants = [];

const calloutVariantMap = {
  "tone": [
    "neutral",
    "informative",
    "positive",
    "warning",
    "critical",
    "magic"
  ]
};

function callout(props) {
  return Object.fromEntries(
    calloutSlotNames.map(([slot, className]) => {
      return [
        slot,
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(callout, { splitVariantProps: (props) => shared.splitVariantProps(props, calloutVariantMap) });

// @recipe(seed): callout

exports.callout = callout;
exports.calloutVariantMap = calloutVariantMap;
