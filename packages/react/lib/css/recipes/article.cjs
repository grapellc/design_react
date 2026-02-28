'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css              */
const shared = require('./shared.cjs');

const defaultVariant = {};

const compoundVariants = [];

const articleVariantMap = {};

function article(props) {
  return shared.createClassName(
    "seed-article",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(article, { splitVariantProps: (props) => shared.splitVariantProps(props, articleVariantMap) });

// @recipe(seed): article

exports.article = article;
exports.articleVariantMap = articleVariantMap;
