'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                  */
const shared = require('./shared.cjs');

const defaultVariant = {
  "variant": "mediumWeak"
};

const compoundVariants = [];

const listHeaderVariantMap = {
  "variant": [
    "mediumWeak",
    "boldSolid"
  ]
};

function listHeader(props) {
  return shared.createClassName(
    "seed-list-header",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(listHeader, { splitVariantProps: (props) => shared.splitVariantProps(props, listHeaderVariantMap) });

// @recipe(seed): list-header

exports.listHeader = listHeader;
exports.listHeaderVariantMap = listHeaderVariantMap;
