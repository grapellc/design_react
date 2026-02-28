'use client';
/* empty css                  */
import { createClassName, mergeVariants, splitVariantProps } from './shared.js';

const defaultVariant = {
  "variant": "brandSolid",
  "size": "medium",
  "layout": "withText"
};

const compoundVariants = [
  {
    "size": "xsmall",
    "layout": "withText"
  },
  {
    "size": "xsmall",
    "layout": "iconOnly"
  },
  {
    "size": "small",
    "layout": "withText"
  },
  {
    "size": "small",
    "layout": "iconOnly"
  },
  {
    "size": "medium",
    "layout": "withText"
  },
  {
    "size": "medium",
    "layout": "iconOnly"
  },
  {
    "size": "large",
    "layout": "withText"
  },
  {
    "size": "large",
    "layout": "iconOnly"
  }
];

const actionButtonVariantMap = {
  "variant": [
    "brandSolid",
    "neutralSolid",
    "neutralWeak",
    "criticalSolid",
    "brandOutline",
    "neutralOutline",
    "ghost"
  ],
  "size": [
    "xsmall",
    "small",
    "medium",
    "large"
  ],
  "layout": [
    "withText",
    "iconOnly"
  ]
};

function actionButton(props) {
  return createClassName(
    "seed-action-button",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(actionButton, { splitVariantProps: (props) => splitVariantProps(props, actionButtonVariantMap) });

// @recipe(seed): action-button

export { actionButton, actionButtonVariantMap };
