'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css               */
const shared = require('./shared.cjs');

const defaultVariant = {
  "radius": 8,
  "tone": "neutral"
};

const compoundVariants = [];

const skeletonVariantMap = {
  "radius": [
    "0",
    "8",
    "16",
    "full"
  ],
  "tone": [
    "neutral",
    "magic"
  ]
};

function skeleton(props) {
  return shared.createClassName(
    "seed-skeleton",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(skeleton, { splitVariantProps: (props) => shared.splitVariantProps(props, skeletonVariantMap) });

// @recipe(seed): skeleton

exports.skeleton = skeleton;
exports.skeletonVariantMap = skeletonVariantMap;
