'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                           */
const shared = require('./shared.cjs');

const identityPlaceholderSlotNames = [
  [
    "root",
    "seed-identity-placeholder__root"
  ],
  [
    "image",
    "seed-identity-placeholder__image"
  ]
];

const defaultVariant = {
  "identity": "person"
};

const compoundVariants = [];

const identityPlaceholderVariantMap = {
  "identity": [
    "person"
  ]
};

function identityPlaceholder(props) {
  return Object.fromEntries(
    identityPlaceholderSlotNames.map(([slot, className]) => {
      return [
        slot,
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(identityPlaceholder, { splitVariantProps: (props) => shared.splitVariantProps(props, identityPlaceholderVariantMap) });

// @recipe(seed): identity-placeholder

exports.identityPlaceholder = identityPlaceholder;
exports.identityPlaceholderVariantMap = identityPlaceholderVariantMap;
