'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                   */
const shared = require('./shared.cjs');

const defaultVariant = {
  "size": "t4",
  "weight": "regular"
};

const compoundVariants = [];

const linkContentVariantMap = {
  "weight": [
    "bold",
    "regular"
  ],
  "size": [
    "t6",
    "t5",
    "t4"
  ]
};

function linkContent(props) {
  return shared.createClassName(
    "seed-link-content",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(linkContent, { splitVariantProps: (props) => shared.splitVariantProps(props, linkContentVariantMap) });

// @recipe(seed): link-content

exports.linkContent = linkContent;
exports.linkContentVariantMap = linkContentVariantMap;
