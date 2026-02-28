'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                      */
const shared = require('./shared.cjs');

const pullToRefreshSlotNames = [
  [
    "root",
    "seed-pull-to-refresh__root"
  ],
  [
    "indicator",
    "seed-pull-to-refresh__indicator"
  ]
];

const defaultVariant = {};

const compoundVariants = [];

const pullToRefreshVariantMap = {};

function pullToRefresh(props) {
  return Object.fromEntries(
    pullToRefreshSlotNames.map(([slot, className]) => {
      return [
        slot,
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(pullToRefresh, { splitVariantProps: (props) => shared.splitVariantProps(props, pullToRefreshVariantMap) });

// @recipe(seed): pull-to-refresh

exports.pullToRefresh = pullToRefresh;
exports.pullToRefreshVariantMap = pullToRefreshVariantMap;
