'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                    */
const shared = require('./shared.cjs');

const defaultVariant = {
  "align": "center"
};

const compoundVariants = [];

const sliderMarkerVariantMap = {
  "align": [
    "start",
    "center",
    "end"
  ]
};

function sliderMarker(props) {
  return shared.createClassName(
    "seed-slider-marker",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(sliderMarker, { splitVariantProps: (props) => shared.splitVariantProps(props, sliderMarkerVariantMap) });

// @recipe(seed): slider-marker

exports.sliderMarker = sliderMarker;
exports.sliderMarkerVariantMap = sliderMarkerVariantMap;
