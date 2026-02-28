'use client';
/* empty css               */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

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
        createClassName(className, mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(menuSheet, { splitVariantProps: (props) => splitVariantProps(props, menuSheetVariantMap) });

// @recipe(seed): menu-sheet

export { menuSheet, menuSheetVariantMap };
