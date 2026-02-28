'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css             */
const shared = require('./shared.cjs');

const sliderSlotNames = [
  [
    "root",
    "seed-slider__root"
  ],
  [
    "track",
    "seed-slider__track"
  ],
  [
    "control",
    "seed-slider__control"
  ],
  [
    "range",
    "seed-slider__range"
  ],
  [
    "thumb",
    "seed-slider__thumb"
  ],
  [
    "tick",
    "seed-slider__tick"
  ],
  [
    "markers",
    "seed-slider__markers"
  ],
  [
    "valueIndicatorRoot",
    "seed-slider__valueIndicatorRoot"
  ],
  [
    "valueIndicatorArrow",
    "seed-slider__valueIndicatorArrow"
  ],
  [
    "valueIndicatorArrowTip",
    "seed-slider__valueIndicatorArrowTip"
  ]
];

const defaultVariant = {};

const compoundVariants = [];

const sliderVariantMap = {};

function slider(props) {
  return Object.fromEntries(
    sliderSlotNames.map(([slot, className]) => {
      return [
        slot,
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(slider, { splitVariantProps: (props) => shared.splitVariantProps(props, sliderVariantMap) });

// @recipe(seed): slider

exports.slider = slider;
exports.sliderVariantMap = sliderVariantMap;
