'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                                 */
const shared = require('./shared.cjs');

const defaultVariant = {
  "variant": "solid",
  "layout": "withText"
};

const compoundVariants = [];

const contextualFloatingButtonVariantMap = {
  "variant": [
    "solid",
    "layer"
  ],
  "layout": [
    "withText",
    "iconOnly"
  ]
};

function contextualFloatingButton(props) {
  return shared.createClassName(
    "seed-contextual-floating-button",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(contextualFloatingButton, { splitVariantProps: (props) => shared.splitVariantProps(props, contextualFloatingButtonVariantMap) });

// @recipe(seed): contextual-floating-button

exports.contextualFloatingButton = contextualFloatingButton;
exports.contextualFloatingButtonVariantMap = contextualFloatingButtonVariantMap;
