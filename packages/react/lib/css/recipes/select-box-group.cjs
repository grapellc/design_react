'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                       */
const shared = require('./shared.cjs');

const defaultVariant = {};

const compoundVariants = [];

const selectBoxGroupVariantMap = {};

function selectBoxGroup(props) {
  return shared.createClassName(
    "seed-select-box-group",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(selectBoxGroup, { splitVariantProps: (props) => shared.splitVariantProps(props, selectBoxGroupVariantMap) });

// @recipe(seed): select-box-group

exports.selectBoxGroup = selectBoxGroup;
exports.selectBoxGroupVariantMap = selectBoxGroupVariantMap;
