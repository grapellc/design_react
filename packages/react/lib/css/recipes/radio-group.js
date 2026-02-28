'use client';
/* empty css                */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

const defaultVariant = {};

const compoundVariants = [];

const radioGroupVariantMap = {};

function radioGroup(props) {
  return createClassName(
    "seed-radio-group",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(radioGroup, { splitVariantProps: (props) => splitVariantProps(props, radioGroupVariantMap) });

// @recipe(seed): radio-group

export { radioGroup, radioGroupVariantMap };
