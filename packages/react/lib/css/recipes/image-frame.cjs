'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                  */
const shared = require('./shared.cjs');

const defaultVariant = {
  "stroke": false,
  "rounded": false
};

const compoundVariants = [];

const imageFrameVariantMap = {
  "stroke": [
    true,
    false
  ],
  "rounded": [
    true,
    false
  ]
};

function imageFrame(props) {
  return shared.createClassName(
    "seed-image-frame",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(imageFrame, { splitVariantProps: (props) => shared.splitVariantProps(props, imageFrameVariantMap) });

// @recipe(seed): image-frame

exports.imageFrame = imageFrame;
exports.imageFrameVariantMap = imageFrameVariantMap;
