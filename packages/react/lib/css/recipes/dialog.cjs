'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css             */
const shared = require('./shared.cjs');

const dialogSlotNames = [
  [
    "positioner",
    "seed-dialog__positioner"
  ],
  [
    "backdrop",
    "seed-dialog__backdrop"
  ],
  [
    "content",
    "seed-dialog__content"
  ],
  [
    "header",
    "seed-dialog__header"
  ],
  [
    "footer",
    "seed-dialog__footer"
  ],
  [
    "action",
    "seed-dialog__action"
  ],
  [
    "title",
    "seed-dialog__title"
  ],
  [
    "description",
    "seed-dialog__description"
  ]
];

const defaultVariant = {
  "skipAnimation": false
};

const compoundVariants = [];

const dialogVariantMap = {
  "skipAnimation": [
    false
  ]
};

function dialog(props) {
  return Object.fromEntries(
    dialogSlotNames.map(([slot, className]) => {
      return [
        slot,
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(dialog, { splitVariantProps: (props) => shared.splitVariantProps(props, dialogVariantMap) });

// @recipe(seed): dialog

exports.dialog = dialog;
exports.dialogVariantMap = dialogVariantMap;
