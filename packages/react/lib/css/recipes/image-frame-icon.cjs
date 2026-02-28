'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                       */
const shared = require('./shared.cjs');

const defaultVariant = {};

const compoundVariants = [];

const imageFrameIconVariantMap = {};

function imageFrameIcon(props) {
  return shared.createClassName(
    "seed-image-frame-icon",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(imageFrameIcon, { splitVariantProps: (props) => shared.splitVariantProps(props, imageFrameIconVariantMap) });

// @recipe(seed): image-frame-icon

exports.imageFrameIcon = imageFrameIcon;
exports.imageFrameIconVariantMap = imageFrameIconVariantMap;
