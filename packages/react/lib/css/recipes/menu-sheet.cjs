'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                 */
const shared = require('./shared.cjs');

const menuSheetSlotNames = [
  [
    "backdrop",
    "seed-menu-sheet__backdrop"
  ],
  [
    "positioner",
    "seed-menu-sheet__positioner"
  ],
  [
    "content",
    "seed-menu-sheet__content"
  ],
  [
    "header",
    "seed-menu-sheet__header"
  ],
  [
    "title",
    "seed-menu-sheet__title"
  ],
  [
    "description",
    "seed-menu-sheet__description"
  ],
  [
    "list",
    "seed-menu-sheet__list"
  ],
  [
    "group",
    "seed-menu-sheet__group"
  ],
  [
    "footer",
    "seed-menu-sheet__footer"
  ],
  [
    "closeButton",
    "seed-menu-sheet__closeButton"
  ]
];

const defaultVariant = {
  "skipAnimation": false
};

const compoundVariants = [];

const menuSheetVariantMap = {
  "skipAnimation": [
    false
  ]
};

function menuSheet(props) {
  return Object.fromEntries(
    menuSheetSlotNames.map(([slot, className]) => {
      return [
        slot,
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(menuSheet, { splitVariantProps: (props) => shared.splitVariantProps(props, menuSheetVariantMap) });

// @recipe(seed): menu-sheet

exports.menuSheet = menuSheet;
exports.menuSheetVariantMap = menuSheetVariantMap;
