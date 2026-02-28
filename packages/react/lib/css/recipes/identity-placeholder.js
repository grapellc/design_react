'use client';
/* empty css                         */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

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
        createClassName(className, mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(identityPlaceholder, { splitVariantProps: (props) => splitVariantProps(props, identityPlaceholderVariantMap) });

// @recipe(seed): identity-placeholder

export { identityPlaceholder, identityPlaceholderVariantMap };
