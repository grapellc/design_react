'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                            */
const shared = require('./shared.cjs');

const defaultVariant = {};

const compoundVariants = [];

const imageFrameIndicatorVariantMap = {};

function imageFrameIndicator(props) {
  return shared.createClassName(
    "seed-image-frame-indicator",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(imageFrameIndicator, { splitVariantProps: (props) => shared.splitVariantProps(props, imageFrameIndicatorVariantMap) });

// @recipe(seed): image-frame-indicator

exports.imageFrameIndicator = imageFrameIndicator;
exports.imageFrameIndicatorVariantMap = imageFrameIndicatorVariantMap;
