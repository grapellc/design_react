'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                             */
const shared = require('./shared.cjs');

const floatingActionButtonSlotNames = [
  [
    "root",
    "seed-floating-action-button__root"
  ],
  [
    "icon",
    "seed-floating-action-button__icon"
  ],
  [
    "label",
    "seed-floating-action-button__label"
  ]
];

const defaultVariant = {
  "extended": true
};

const compoundVariants = [];

const floatingActionButtonVariantMap = {
  "extended": [
    true,
    false
  ]
};

function floatingActionButton(props) {
  return Object.fromEntries(
    floatingActionButtonSlotNames.map(([slot, className]) => {
      return [
        slot,
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(floatingActionButton, { splitVariantProps: (props) => shared.splitVariantProps(props, floatingActionButtonVariantMap) });

// @recipe(seed): floating-action-button

exports.floatingActionButton = floatingActionButton;
exports.floatingActionButtonVariantMap = floatingActionButtonVariantMap;
