'use client';
/* empty css             */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

const defaultVariant = {
  "radius": 8,
  "tone": "neutral"
};

const compoundVariants = [];

const skeletonVariantMap = {
  "radius": [
    "0",
    "8",
    "16",
    "full"
  ],
  "tone": [
    "neutral",
    "magic"
  ]
};

function skeleton(props) {
  return createClassName(
    "seed-skeleton",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(skeleton, { splitVariantProps: (props) => splitVariantProps(props, skeletonVariantMap) });

// @recipe(seed): skeleton

export { skeleton, skeletonVariantMap };
