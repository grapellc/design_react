'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                */
const shared = require('./shared.cjs');

const checkmarkSlotNames = [
  [
    "root",
    "seed-checkmark__root"
  ],
  [
    "icon",
    "seed-checkmark__icon"
  ]
];

const defaultVariant = {
  "variant": "square",
  "tone": "brand",
  "size": "medium"
};

const compoundVariants = [
  {
    "variant": "square",
    "tone": "neutral"
  },
  {
    "variant": "square",
    "tone": "brand"
  },
  {
    "variant": "ghost",
    "tone": "neutral"
  },
  {
    "variant": "ghost",
    "tone": "brand"
  },
  {
    "size": "medium",
    "variant": "ghost"
  },
  {
    "size": "large",
    "variant": "ghost"
  },
  {
    "size": "medium",
    "variant": "square"
  },
  {
    "size": "large",
    "variant": "square"
  }
];

const checkmarkVariantMap = {
  "variant": [
    "square",
    "ghost"
  ],
  "tone": [
    "neutral",
    "brand"
  ],
  "size": [
    "large",
    "medium"
  ]
};

function checkmark(props) {
  return Object.fromEntries(
    checkmarkSlotNames.map(([slot, className]) => {
      return [
        slot,
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(checkmark, { splitVariantProps: (props) => shared.splitVariantProps(props, checkmarkVariantMap) });

// @recipe(seed): checkmark

exports.checkmark = checkmark;
exports.checkmarkVariantMap = checkmarkVariantMap;
