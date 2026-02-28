'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css          */
const shared = require('./shared.cjs');

const defaultVariant = {};

const compoundVariants = [];

const fabVariantMap = {};

function fab(props) {
  return shared.createClassName(
    "seed-fab",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(fab, { splitVariantProps: (props) => shared.splitVariantProps(props, fabVariantMap) });

// @recipe(seed): fab

exports.fab = fab;
exports.fabVariantMap = fabVariantMap;
