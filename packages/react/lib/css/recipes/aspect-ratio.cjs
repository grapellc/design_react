'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                   */
const shared = require('./shared.cjs');

const defaultVariant = {};

const compoundVariants = [];

const aspectRatioVariantMap = {};

function aspectRatio(props) {
  return shared.createClassName(
    "seed-aspect-ratio",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(aspectRatio, { splitVariantProps: (props) => shared.splitVariantProps(props, aspectRatioVariantMap) });

// @recipe(seed): aspect-ratio

exports.aspectRatio = aspectRatio;
exports.aspectRatioVariantMap = aspectRatioVariantMap;
