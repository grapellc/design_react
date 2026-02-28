'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                */
const shared = require('./shared.cjs');

const listItemSlotNames = [
  [
    "root",
    "seed-list-item__root"
  ],
  [
    "content",
    "seed-list-item__content"
  ],
  [
    "title",
    "seed-list-item__title"
  ],
  [
    "detail",
    "seed-list-item__detail"
  ],
  [
    "prefix",
    "seed-list-item__prefix"
  ],
  [
    "suffix",
    "seed-list-item__suffix"
  ]
];

const defaultVariant = {
  "highlighted": false
};

const compoundVariants = [];

const listItemVariantMap = {
  "highlighted": [
    false,
    true
  ]
};

function listItem(props) {
  return Object.fromEntries(
    listItemSlotNames.map(([slot, className]) => {
      return [
        slot,
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(listItem, { splitVariantProps: (props) => shared.splitVariantProps(props, listItemVariantMap) });

// @recipe(seed): list-item

exports.listItem = listItem;
exports.listItemVariantMap = listItemVariantMap;
