'use client';
/* empty css               */
import { createClassName, mergeVariants, splitVariantProps } from './shared.js';

const defaultVariant = {
  "hideScrollBar": false
};

const compoundVariants = [];

const scrollFogVariantMap = {
  "hideScrollBar": [
    true
  ]
};

function scrollFog(props) {
  return createClassName(
    "seed-scroll-fog",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(scrollFog, { splitVariantProps: (props) => splitVariantProps(props, scrollFogVariantMap) });

// @recipe(seed): scroll-fog

export { scrollFog, scrollFogVariantMap };
