'use client';
/* empty css                     */
import { createClassName, mergeVariants, splitVariantProps } from './shared.js';

const defaultVariant = {};

const compoundVariants = [];

const selectBoxGroupVariantMap = {};

function selectBoxGroup(props) {
  return createClassName(
    "seed-select-box-group",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(selectBoxGroup, { splitVariantProps: (props) => splitVariantProps(props, selectBoxGroupVariantMap) });

// @recipe(seed): select-box-group

export { selectBoxGroup, selectBoxGroupVariantMap };
