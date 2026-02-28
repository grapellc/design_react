'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                  */
const shared = require('./shared.cjs');

const defaultVariant = {};

const compoundVariants = [];

const radioGroupVariantMap = {};

function radioGroup(props) {
  return shared.createClassName(
    "seed-radio-group",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(radioGroup, { splitVariantProps: (props) => shared.splitVariantProps(props, radioGroupVariantMap) });

// @recipe(seed): radio-group

exports.radioGroup = radioGroup;
exports.radioGroupVariantMap = radioGroupVariantMap;
