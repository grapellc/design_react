'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                   */
const shared = require('./shared.cjs');

const defaultVariant = {
  "variant": "neutralSolid",
  "size": "medium"
};

const compoundVariants = [];

const extendedFabVariantMap = {
  "variant": [
    "neutralSolid",
    "layerFloating"
  ],
  "size": [
    "small",
    "medium"
  ]
};

function extendedFab(props) {
  return shared.createClassName(
    "seed-extended-fab",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(extendedFab, { splitVariantProps: (props) => shared.splitVariantProps(props, extendedFabVariantMap) });

// @recipe(seed): extended-fab

exports.extendedFab = extendedFab;
exports.extendedFabVariantMap = extendedFabVariantMap;
