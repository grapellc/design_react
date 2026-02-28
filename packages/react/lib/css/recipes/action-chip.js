'use client';
/* empty css                */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

const defaultVariant = {
  "size": "medium",
  "layout": "withText"
};

const compoundVariants = [
  {
    "size": "medium",
    "layout": "withText"
  },
  {
    "size": "medium",
    "layout": "iconOnly"
  },
  {
    "size": "small",
    "layout": "withText"
  },
  {
    "size": "small",
    "layout": "iconOnly"
  }
];

const actionChipVariantMap = {
  "size": [
    "medium",
    "small"
  ],
  "layout": [
    "withText",
    "iconOnly"
  ]
};

function actionChip(props) {
  return createClassName(
    "seed-action-chip",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(actionChip, { splitVariantProps: (props) => splitVariantProps(props, actionChipVariantMap) });

// @recipe(seed): action-chip

export { actionChip, actionChipVariantMap };
