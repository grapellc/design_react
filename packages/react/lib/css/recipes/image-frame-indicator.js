'use client';
/* empty css                          */
import { createClassName, mergeVariants, splitVariantProps } from './shared.js';

const defaultVariant = {};

const compoundVariants = [];

const imageFrameIndicatorVariantMap = {};

function imageFrameIndicator(props) {
  return createClassName(
    "seed-image-frame-indicator",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(imageFrameIndicator, { splitVariantProps: (props) => splitVariantProps(props, imageFrameIndicatorVariantMap) });

// @recipe(seed): image-frame-indicator

export { imageFrameIndicator, imageFrameIndicatorVariantMap };
