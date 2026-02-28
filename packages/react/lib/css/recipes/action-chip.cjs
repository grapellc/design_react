'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                  */
const shared = require('./shared.cjs');

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
  return shared.createClassName(
    "seed-action-chip",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(actionChip, { splitVariantProps: (props) => shared.splitVariantProps(props, actionChipVariantMap) });

// @recipe(seed): action-chip

exports.actionChip = actionChip;
exports.actionChipVariantMap = actionChipVariantMap;
