'use client';
/* empty css        */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

const defaultVariant = {};

const compoundVariants = [];

const fabVariantMap = {};

function fab(props) {
  return createClassName(
    "seed-fab",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(fab, { splitVariantProps: (props) => splitVariantProps(props, fabVariantMap) });

// @recipe(seed): fab

export { fab, fabVariantMap };
