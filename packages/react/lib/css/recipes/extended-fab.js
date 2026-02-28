'use client';
/* empty css                 */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

const defaultVariant = {
  "variant": "neutralSolid",
  "size": "medium"
};

const compoundVariants = [];

const extendedFabVariantMap = {
  "variant": [
    "neutralSolid",
    "layerFloating"
  ],
  "size": [
    "small",
    "medium"
  ]
};

function extendedFab(props) {
  return createClassName(
    "seed-extended-fab",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(extendedFab, { splitVariantProps: (props) => splitVariantProps(props, extendedFabVariantMap) });

// @recipe(seed): extended-fab

export { extendedFab, extendedFabVariantMap };
