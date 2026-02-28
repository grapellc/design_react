'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                                 */
const shared = require('./shared.cjs');

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
  return shared.createClassName(
    "seed-extended-action-sheet-item",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(extendedActionSheetItem, { splitVariantProps: (props) => shared.splitVariantProps(props, extendedActionSheetItemVariantMap) });

// @recipe(seed): extended-action-sheet-item

exports.extendedActionSheetItem = extendedActionSheetItem;
exports.extendedActionSheetItemVariantMap = extendedActionSheetItemVariantMap;
