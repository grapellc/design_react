'use client';
/* empty css                      */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

const defaultVariant = {
  "tone": "neutral"
};

const compoundVariants = [];

const actionSheetItemVariantMap = {
  "tone": [
    "neutral",
    "critical"
  ]
};

function actionSheetItem(props) {
  return createClassName(
    "seed-action-sheet-item",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(actionSheetItem, { splitVariantProps: (props) => splitVariantProps(props, actionSheetItemVariantMap) });

// @recipe(seed): action-sheet-item

export { actionSheetItem, actionSheetItemVariantMap };
