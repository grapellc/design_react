'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                          */
const shared = require('./shared.cjs');

const bottomSheetHandleSlotNames = [
  [
    "root",
    "seed-bottom-sheet-handle__root"
  ],
  [
    "touchArea",
    "seed-bottom-sheet-handle__touchArea"
  ]
];

const defaultVariant = {};

const compoundVariants = [];

const bottomSheetHandleVariantMap = {};

function bottomSheetHandle(props) {
  return Object.fromEntries(
    bottomSheetHandleSlotNames.map(([slot, className]) => {
      return [
        slot,
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(bottomSheetHandle, { splitVariantProps: (props) => shared.splitVariantProps(props, bottomSheetHandleVariantMap) });

// @recipe(seed): bottom-sheet-handle

exports.bottomSheetHandle = bottomSheetHandle;
exports.bottomSheetHandleVariantMap = bottomSheetHandleVariantMap;
