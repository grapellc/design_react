'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                      */
const shared = require('./shared.cjs');

const defaultVariant = {};

const compoundVariants = [];

const snackbarRegionVariantMap = {};

function snackbarRegion(props) {
  return shared.createClassName(
    "seed-snackbar-region",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(snackbarRegion, { splitVariantProps: (props) => shared.splitVariantProps(props, snackbarRegionVariantMap) });

// @recipe(seed): snackbar-region

exports.snackbarRegion = snackbarRegion;
exports.snackbarRegionVariantMap = snackbarRegionVariantMap;
