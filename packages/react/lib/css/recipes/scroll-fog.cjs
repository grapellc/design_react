'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                 */
const shared = require('./shared.cjs');

const defaultVariant = {
  "hideScrollBar": false
};

const compoundVariants = [];

const scrollFogVariantMap = {
  "hideScrollBar": [
    true
  ]
};

function scrollFog(props) {
  return shared.createClassName(
    "seed-scroll-fog",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(scrollFog, { splitVariantProps: (props) => shared.splitVariantProps(props, scrollFogVariantMap) });

// @recipe(seed): scroll-fog

exports.scrollFog = scrollFog;
exports.scrollFogVariantMap = scrollFogVariantMap;
