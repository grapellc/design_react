'use client';
/* empty css                 */
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

const controlChipVariantMap = {
  "size": [
    "medium",
    "small"
  ],
  "layout": [
    "withText",
    "iconOnly"
  ]
};

function controlChip(props) {
  return createClassName(
    "seed-control-chip",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(controlChip, { splitVariantProps: (props) => splitVariantProps(props, controlChipVariantMap) });

// @recipe(seed): control-chip

export { controlChip, controlChipVariantMap };
