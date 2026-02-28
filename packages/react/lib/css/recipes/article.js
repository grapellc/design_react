'use client';
/* empty css            */
import { createClassName, mergeVariants, splitVariantProps } from './shared.js';

const defaultVariant = {};

const compoundVariants = [];

const articleVariantMap = {};

function article(props) {
  return createClassName(
    "seed-article",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(article, { splitVariantProps: (props) => splitVariantProps(props, articleVariantMap) });

// @recipe(seed): article

export { article, articleVariantMap };
