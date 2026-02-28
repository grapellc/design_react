'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                  */
const shared = require('./shared.cjs');

const defaultVariant = {
  "weight": "thin"
};

const compoundVariants = [];

const sliderTickVariantMap = {
  "weight": [
    "thin",
    "thick"
  ]
};

function sliderTick(props) {
  return shared.createClassName(
    "seed-slider-tick",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(sliderTick, { splitVariantProps: (props) => shared.splitVariantProps(props, sliderTickVariantMap) });

// @recipe(seed): slider-tick

exports.sliderTick = sliderTick;
exports.sliderTickVariantMap = sliderTickVariantMap;
