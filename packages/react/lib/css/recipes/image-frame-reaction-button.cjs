'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                                  */
const shared = require('./shared.cjs');

const defaultVariant = {};

const compoundVariants = [];

const imageFrameReactionButtonVariantMap = {};

function imageFrameReactionButton(props) {
  return shared.createClassName(
    "seed-image-frame-reaction-button",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(imageFrameReactionButton, { splitVariantProps: (props) => shared.splitVariantProps(props, imageFrameReactionButtonVariantMap) });

// @recipe(seed): image-frame-reaction-button

exports.imageFrameReactionButton = imageFrameReactionButton;
exports.imageFrameReactionButtonVariantMap = imageFrameReactionButtonVariantMap;
