'use client';
/* empty css                   */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

const defaultVariant = {};

const compoundVariants = [];

const checkboxGroupVariantMap = {};

function checkboxGroup(props) {
  return createClassName(
    "seed-checkbox-group",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(checkboxGroup, { splitVariantProps: (props) => splitVariantProps(props, checkboxGroupVariantMap) });

// @recipe(seed): checkbox-group

export { checkboxGroup, checkboxGroupVariantMap };
