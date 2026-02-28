'use client';
/* empty css                    */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

const defaultVariant = {};

const compoundVariants = [];

const snackbarRegionVariantMap = {};

function snackbarRegion(props) {
  return createClassName(
    "seed-snackbar-region",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(snackbarRegion, { splitVariantProps: (props) => splitVariantProps(props, snackbarRegionVariantMap) });

// @recipe(seed): snackbar-region

export { snackbarRegion, snackbarRegionVariantMap };
