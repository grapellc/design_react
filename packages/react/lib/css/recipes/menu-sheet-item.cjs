'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                      */
const shared = require('./shared.cjs');

const menuSheetItemSlotNames = [
  [
    "root",
    "seed-menu-sheet-item__root"
  ],
  [
    "content",
    "seed-menu-sheet-item__content"
  ],
  [
    "label",
    "seed-menu-sheet-item__label"
  ],
  [
    "description",
    "seed-menu-sheet-item__description"
  ]
];

const defaultVariant = {
  "tone": "neutral",
  "labelAlign": "left"
};

const compoundVariants = [];

const menuSheetItemVariantMap = {
  "tone": [
    "neutral",
    "critical"
  ],
  "labelAlign": [
    "left",
    "center"
  ]
};

function menuSheetItem(props) {
  return Object.fromEntries(
    menuSheetItemSlotNames.map(([slot, className]) => {
      return [
        slot,
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(menuSheetItem, { splitVariantProps: (props) => shared.splitVariantProps(props, menuSheetItemVariantMap) });

// @recipe(seed): menu-sheet-item

exports.menuSheetItem = menuSheetItem;
exports.menuSheetItemVariantMap = menuSheetItemVariantMap;
