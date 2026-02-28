'use client';
/* empty css                    */
import { createClassName, mergeVariants, splitVariantProps } from './shared.js';

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
  return createClassName(
    "seed-reaction-button",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(reactionButton, { splitVariantProps: (props) => splitVariantProps(props, reactionButtonVariantMap) });

// @recipe(seed): reaction-button

export { reactionButton, reactionButtonVariantMap };
