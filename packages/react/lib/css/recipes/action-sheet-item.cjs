'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                        */
const shared = require('./shared.cjs');

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
  return shared.createClassName(
    "seed-action-sheet-item",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(actionSheetItem, { splitVariantProps: (props) => shared.splitVariantProps(props, actionSheetItemVariantMap) });

// @recipe(seed): action-sheet-item

exports.actionSheetItem = actionSheetItem;
exports.actionSheetItemVariantMap = actionSheetItemVariantMap;
