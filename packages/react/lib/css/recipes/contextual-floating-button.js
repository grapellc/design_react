'use client';
/* empty css                               */
import { createClassName, mergeVariants, splitVariantProps } from './shared.js';

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
  return createClassName(
    "seed-contextual-floating-button",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(contextualFloatingButton, { splitVariantProps: (props) => splitVariantProps(props, contextualFloatingButtonVariantMap) });

// @recipe(seed): contextual-floating-button

export { contextualFloatingButton, contextualFloatingButtonVariantMap };
