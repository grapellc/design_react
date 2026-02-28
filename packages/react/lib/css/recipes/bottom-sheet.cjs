'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                   */
const shared = require('./shared.cjs');

const bottomSheetSlotNames = [
  [
    "positioner",
    "seed-bottom-sheet__positioner"
  ],
  [
    "backdrop",
    "seed-bottom-sheet__backdrop"
  ],
  [
    "content",
    "seed-bottom-sheet__content"
  ],
  [
    "header",
    "seed-bottom-sheet__header"
  ],
  [
    "body",
    "seed-bottom-sheet__body"
  ],
  [
    "footer",
    "seed-bottom-sheet__footer"
  ],
  [
    "title",
    "seed-bottom-sheet__title"
  ],
  [
    "description",
    "seed-bottom-sheet__description"
  ],
  [
    "closeButton",
    "seed-bottom-sheet__closeButton"
  ]
];

const defaultVariant = {
  "headerAlign": "left",
  "skipAnimation": false
};

const compoundVariants = [];

const bottomSheetVariantMap = {
  "headerAlign": [
    "left",
    "center"
  ],
  "skipAnimation": [
    false
  ]
};

function bottomSheet(props) {
  return Object.fromEntries(
    bottomSheetSlotNames.map(([slot, className]) => {
      return [
        slot,
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(bottomSheet, { splitVariantProps: (props) => shared.splitVariantProps(props, bottomSheetVariantMap) });

// @recipe(seed): bottom-sheet

exports.bottomSheet = bottomSheet;
exports.bottomSheetVariantMap = bottomSheetVariantMap;
