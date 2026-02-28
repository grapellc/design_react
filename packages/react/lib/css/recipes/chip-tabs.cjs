'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                */
const shared = require('./shared.cjs');

const chipTabsSlotNames = [
  [
    "root",
    "seed-chip-tabs__root"
  ],
  [
    "list",
    "seed-chip-tabs__list"
  ],
  [
    "carousel",
    "seed-chip-tabs__carousel"
  ],
  [
    "carouselCamera",
    "seed-chip-tabs__carouselCamera"
  ],
  [
    "content",
    "seed-chip-tabs__content"
  ],
  [
    "trigger",
    "seed-chip-tabs__trigger"
  ]
];

const defaultVariant = {
  "size": "medium",
  "variant": "neutralSolid",
  "contentLayout": "hug",
  "stickyList": false
};

const compoundVariants = [];

const chipTabsVariantMap = {
  "size": [
    "medium",
    "large"
  ],
  "variant": [
    "neutralSolid",
    "neutralOutline",
    "brandSolid"
  ],
  "contentLayout": [
    "fill",
    "hug"
  ],
  "stickyList": [
    true,
    false
  ]
};

function chipTabs(props) {
  return Object.fromEntries(
    chipTabsSlotNames.map(([slot, className]) => {
      return [
        slot,
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(chipTabs, { splitVariantProps: (props) => shared.splitVariantProps(props, chipTabsVariantMap) });

// @recipe(seed): chip-tabs

exports.chipTabs = chipTabs;
exports.chipTabsVariantMap = chipTabsVariantMap;
