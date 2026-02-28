'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                     */
const shared = require('./shared.cjs');

const defaultVariant = {};

const compoundVariants = [];

const checkboxGroupVariantMap = {};

function checkboxGroup(props) {
  return shared.createClassName(
    "seed-checkbox-group",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(checkboxGroup, { splitVariantProps: (props) => shared.splitVariantProps(props, checkboxGroupVariantMap) });

// @recipe(seed): checkbox-group

exports.checkboxGroup = checkboxGroup;
exports.checkboxGroupVariantMap = checkboxGroupVariantMap;
