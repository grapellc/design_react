'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                */
const shared = require('./shared.cjs');

const tagGroupSlotNames = [
  [
    "root",
    "seed-tag-group__root"
  ],
  [
    "separator",
    "seed-tag-group__separator"
  ]
];

const defaultVariant = {
  "size": "t2",
  "truncate": false
};

const compoundVariants = [
  {
    "size": "t2",
    "truncate": false
  },
  {
    "size": "t3",
    "truncate": false
  },
  {
    "size": "t4",
    "truncate": false
  }
];

const tagGroupVariantMap = {
  "size": [
    "t2",
    "t3",
    "t4"
  ],
  "truncate": [
    true,
    false
  ]
};

function tagGroup(props) {
  return Object.fromEntries(
    tagGroupSlotNames.map(([slot, className]) => {
      return [
        slot,
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(tagGroup, { splitVariantProps: (props) => shared.splitVariantProps(props, tagGroupVariantMap) });

// @recipe(seed): tag-group

exports.tagGroup = tagGroup;
exports.tagGroupVariantMap = tagGroupVariantMap;
