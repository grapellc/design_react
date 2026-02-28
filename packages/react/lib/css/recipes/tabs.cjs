'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css           */
const shared = require('./shared.cjs');

const tabsSlotNames = [
  [
    "root",
    "seed-tabs__root"
  ],
  [
    "list",
    "seed-tabs__list"
  ],
  [
    "carousel",
    "seed-tabs__carousel"
  ],
  [
    "carouselCamera",
    "seed-tabs__carouselCamera"
  ],
  [
    "content",
    "seed-tabs__content"
  ],
  [
    "indicator",
    "seed-tabs__indicator"
  ],
  [
    "trigger",
    "seed-tabs__trigger"
  ]
];

const defaultVariant = {
  "triggerLayout": "fill",
  "contentLayout": "hug",
  "size": "small",
  "stickyList": false
};

const compoundVariants = [];

const tabsVariantMap = {
  "triggerLayout": [
    "fill",
    "hug"
  ],
  "contentLayout": [
    "fill",
    "hug"
  ],
  "size": [
    "small",
    "medium"
  ],
  "stickyList": [
    true,
    false
  ]
};

function tabs(props) {
  return Object.fromEntries(
    tabsSlotNames.map(([slot, className]) => {
      return [
        slot,
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(tabs, { splitVariantProps: (props) => shared.splitVariantProps(props, tabsVariantMap) });

// @recipe(seed): tabs

exports.tabs = tabs;
exports.tabsVariantMap = tabsVariantMap;
