'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                  */
const shared = require('./shared.cjs');

const defaultVariant = {
  "level": "l1"
};

const compoundVariants = [];

const mannerTempVariantMap = {
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

function mannerTemp(props) {
  return shared.createClassName(
    "seed-manner-temp",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(mannerTemp, { splitVariantProps: (props) => shared.splitVariantProps(props, mannerTempVariantMap) });

// @recipe(seed): manner-temp

exports.mannerTemp = mannerTemp;
exports.mannerTempVariantMap = mannerTempVariantMap;
