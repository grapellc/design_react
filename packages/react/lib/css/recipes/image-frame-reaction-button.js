'use client';
/* empty css                                */
import { createClassName, mergeVariants, splitVariantProps } from './shared.js';

const defaultVariant = {};

const compoundVariants = [];

const imageFrameReactionButtonVariantMap = {};

function imageFrameReactionButton(props) {
  return createClassName(
    "seed-image-frame-reaction-button",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(imageFrameReactionButton, { splitVariantProps: (props) => splitVariantProps(props, imageFrameReactionButtonVariantMap) });

// @recipe(seed): image-frame-reaction-button

export { imageFrameReactionButton, imageFrameReactionButtonVariantMap };
