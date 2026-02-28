'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                     */
const shared = require('./shared.cjs');

const tagGroupItemSlotNames = [
  [
    "root",
    "seed-tag-group-item__root"
  ],
  [
    "label",
    "seed-tag-group-item__label"
  ]
];

const defaultVariant = {
  "size": "t2",
  "weight": "regular",
  "tone": "neutralSubtle"
};

const compoundVariants = [];

const tagGroupItemVariantMap = {
  "size": [
    "t2",
    "t3",
    "t4"
  ],
  "weight": [
    "regular",
    "bold"
  ],
  "tone": [
    "neutralSubtle",
    "neutral",
    "brand"
  ]
};

function tagGroupItem(props) {
  return Object.fromEntries(
    tagGroupItemSlotNames.map(([slot, className]) => {
      return [
        slot,
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(tagGroupItem, { splitVariantProps: (props) => shared.splitVariantProps(props, tagGroupItemVariantMap) });

// @recipe(seed): tag-group-item

exports.tagGroupItem = tagGroupItem;
exports.tagGroupItemVariantMap = tagGroupItemVariantMap;
