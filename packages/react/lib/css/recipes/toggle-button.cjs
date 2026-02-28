'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                    */
const shared = require('./shared.cjs');

const defaultVariant = {
  "variant": "brandSolid",
  "size": "small"
};

const compoundVariants = [];

const toggleButtonVariantMap = {
  "variant": [
    "brandSolid",
    "neutralWeak"
  ],
  "size": [
    "xsmall",
    "small"
  ]
};

function toggleButton(props) {
  return shared.createClassName(
    "seed-toggle-button",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(toggleButton, { splitVariantProps: (props) => shared.splitVariantProps(props, toggleButtonVariantMap) });

// @recipe(seed): toggle-button

exports.toggleButton = toggleButton;
exports.toggleButtonVariantMap = toggleButtonVariantMap;
