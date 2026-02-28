'use client';
/* empty css                               */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

const defaultVariant = {
  "tone": "neutral"
};

const compoundVariants = [];

const extendedActionSheetItemVariantMap = {
  "tone": [
    "neutral",
    "critical"
  ]
};

function extendedActionSheetItem(props) {
  return createClassName(
    "seed-extended-action-sheet-item",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(extendedActionSheetItem, { splitVariantProps: (props) => splitVariantProps(props, extendedActionSheetItemVariantMap) });

// @recipe(seed): extended-action-sheet-item

export { extendedActionSheetItem, extendedActionSheetItemVariantMap };
