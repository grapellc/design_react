'use client';
/* empty css                  */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

const defaultVariant = {
  "align": "center"
};

const compoundVariants = [];

const sliderMarkerVariantMap = {
  "align": [
    "start",
    "center",
    "end"
  ]
};

function sliderMarker(props) {
  return createClassName(
    "seed-slider-marker",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(sliderMarker, { splitVariantProps: (props) => splitVariantProps(props, sliderMarkerVariantMap) });

// @recipe(seed): slider-marker

export { sliderMarker, sliderMarkerVariantMap };
