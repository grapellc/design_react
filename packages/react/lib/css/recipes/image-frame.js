'use client';
/* empty css                */
import { createClassName, mergeVariants, splitVariantProps } from './shared.js';

const defaultVariant = {
  "stroke": false,
  "rounded": false
};

const compoundVariants = [];

const imageFrameVariantMap = {
  "stroke": [
    true,
    false
  ],
  "rounded": [
    true,
    false
  ]
};

function imageFrame(props) {
  return createClassName(
    "seed-image-frame",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(imageFrame, { splitVariantProps: (props) => splitVariantProps(props, imageFrameVariantMap) });

// @recipe(seed): image-frame

export { imageFrame, imageFrameVariantMap };
