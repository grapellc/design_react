'use client';
/* empty css                */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

const defaultVariant = {
  "level": "l1"
};

const compoundVariants = [];

const mannerTempVariantMap = {
  "level": [
    "l1",
    "l2",
    "l3",
    "l4",
    "l5",
    "l6",
    "l7",
    "l8",
    "l9",
    "l10"
  ]
};

function mannerTemp(props) {
  return createClassName(
    "seed-manner-temp",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(mannerTemp, { splitVariantProps: (props) => splitVariantProps(props, mannerTempVariantMap) });

// @recipe(seed): manner-temp

export { mannerTemp, mannerTempVariantMap };
