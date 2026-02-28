'use client';
/* empty css                  */
import { createClassName, mergeVariants, splitVariantProps } from './shared.js';

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
  return createClassName(
    "seed-toggle-button",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(toggleButton, { splitVariantProps: (props) => splitVariantProps(props, toggleButtonVariantMap) });

// @recipe(seed): toggle-button

export { toggleButton, toggleButtonVariantMap };
