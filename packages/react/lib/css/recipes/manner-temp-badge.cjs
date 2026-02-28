'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                        */
const shared = require('./shared.cjs');

const defaultVariant = {
  "level": "l1"
};

const compoundVariants = [];

const mannerTempBadgeVariantMap = {
  "level": [
    "l1",
    "l2",
    "l3",
    "l4",
    "l5",
    "l6",
    "l7",
    "l8",
    "l9",
    "l10"
  ]
};

function mannerTempBadge(props) {
  return shared.createClassName(
    "seed-manner-temp-badge",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(mannerTempBadge, { splitVariantProps: (props) => shared.splitVariantProps(props, mannerTempBadgeVariantMap) });

// @recipe(seed): manner-temp-badge

exports.mannerTempBadge = mannerTempBadge;
exports.mannerTempBadgeVariantMap = mannerTempBadgeVariantMap;
