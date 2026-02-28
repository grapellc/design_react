'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                   */
const shared = require('./shared.cjs');

const avatarStackSlotNames = [
  [
    "root",
    "seed-avatar-stack__root"
  ],
  [
    "item",
    "seed-avatar-stack__item"
  ]
];

const defaultVariant = {
  "size": 48
};

const compoundVariants = [];

const avatarStackVariantMap = {
  "size": [
    "20",
    "24",
    "36",
    "42",
    "48",
    "64",
    "80",
    "96",
    "108"
  ]
};

function avatarStack(props) {
  return Object.fromEntries(
    avatarStackSlotNames.map(([slot, className]) => {
      return [
        slot,
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(avatarStack, { splitVariantProps: (props) => shared.splitVariantProps(props, avatarStackVariantMap) });

// @recipe(seed): avatar-stack

exports.avatarStack = avatarStack;
exports.avatarStackVariantMap = avatarStackVariantMap;
