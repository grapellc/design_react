'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                      */
const shared = require('./shared.cjs');

const defaultVariant = {
  "size": "small"
};

const compoundVariants = [];

const reactionButtonVariantMap = {
  "size": [
    "xsmall",
    "small"
  ]
};

function reactionButton(props) {
  return shared.createClassName(
    "seed-reaction-button",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(reactionButton, { splitVariantProps: (props) => shared.splitVariantProps(props, reactionButtonVariantMap) });

// @recipe(seed): reaction-button

exports.reactionButton = reactionButton;
exports.reactionButtonVariantMap = reactionButtonVariantMap;
