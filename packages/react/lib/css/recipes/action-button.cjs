'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                    */
const shared = require('./shared.cjs');

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
  return shared.createClassName(
    "seed-action-button",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(actionButton, { splitVariantProps: (props) => shared.splitVariantProps(props, actionButtonVariantMap) });

// @recipe(seed): action-button

exports.actionButton = actionButton;
exports.actionButtonVariantMap = actionButtonVariantMap;
