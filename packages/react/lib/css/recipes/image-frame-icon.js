'use client';
/* empty css                     */
import { createClassName, mergeVariants, splitVariantProps } from './shared.js';

const defaultVariant = {};

const compoundVariants = [];

const imageFrameIconVariantMap = {};

function imageFrameIcon(props) {
  return createClassName(
    "seed-image-frame-icon",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(imageFrameIcon, { splitVariantProps: (props) => splitVariantProps(props, imageFrameIconVariantMap) });

// @recipe(seed): image-frame-icon

export { imageFrameIcon, imageFrameIconVariantMap };
