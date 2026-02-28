'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css               */
const shared = require('./shared.cjs');

const snackbarSlotNames = [
  [
    "root",
    "seed-snackbar__root"
  ],
  [
    "message",
    "seed-snackbar__message"
  ],
  [
    "prefixIcon",
    "seed-snackbar__prefixIcon"
  ],
  [
    "actionButton",
    "seed-snackbar__actionButton"
  ],
  [
    "content",
    "seed-snackbar__content"
  ]
];

const defaultVariant = {
  "variant": "default"
};

const compoundVariants = [];

const snackbarVariantMap = {
  "variant": [
    "default",
    "positive",
    "critical"
  ]
};

function snackbar(props) {
  return Object.fromEntries(
    snackbarSlotNames.map(([slot, className]) => {
      return [
        slot,
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(snackbar, { splitVariantProps: (props) => shared.splitVariantProps(props, snackbarVariantMap) });

// @recipe(seed): snackbar

exports.snackbar = snackbar;
exports.snackbarVariantMap = snackbarVariantMap;
