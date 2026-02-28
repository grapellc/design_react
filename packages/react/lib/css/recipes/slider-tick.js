'use client';
/* empty css                */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

const defaultVariant = {
  "weight": "thin"
};

const compoundVariants = [];

const sliderTickVariantMap = {
  "weight": [
    "thin",
    "thick"
  ]
};

function sliderTick(props) {
  return createClassName(
    "seed-slider-tick",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(sliderTick, { splitVariantProps: (props) => splitVariantProps(props, sliderTickVariantMap) });

// @recipe(seed): slider-tick

export { sliderTick, sliderTickVariantMap };
