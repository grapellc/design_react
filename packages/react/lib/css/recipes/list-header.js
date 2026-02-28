'use client';
/* empty css                */
import { createClassName, mergeVariants, splitVariantProps } from './shared.js';

const defaultVariant = {
  "variant": "mediumWeak"
};

const compoundVariants = [];

const listHeaderVariantMap = {
  "variant": [
    "mediumWeak",
    "boldSolid"
  ]
};

function listHeader(props) {
  return createClassName(
    "seed-list-header",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(listHeader, { splitVariantProps: (props) => splitVariantProps(props, listHeaderVariantMap) });

// @recipe(seed): list-header

export { listHeader, listHeaderVariantMap };
