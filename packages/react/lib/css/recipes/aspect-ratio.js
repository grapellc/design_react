'use client';
/* empty css                 */
import { createClassName, mergeVariants, splitVariantProps } from './shared.js';

const defaultVariant = {};

const compoundVariants = [];

const aspectRatioVariantMap = {};

function aspectRatio(props) {
  return createClassName(
    "seed-aspect-ratio",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(aspectRatio, { splitVariantProps: (props) => splitVariantProps(props, aspectRatioVariantMap) });

// @recipe(seed): aspect-ratio

export { aspectRatio, aspectRatioVariantMap };
