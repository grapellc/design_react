'use client';
/* empty css                 */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

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
  return createClassName(
    "seed-link-content",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(linkContent, { splitVariantProps: (props) => splitVariantProps(props, linkContentVariantMap) });

// @recipe(seed): link-content

export { linkContent, linkContentVariantMap };
