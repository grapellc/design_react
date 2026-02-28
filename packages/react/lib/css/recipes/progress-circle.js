'use client';
/* empty css                    */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

const progressCircleSlotNames = [
  [
    "root",
    "seed-progress-circle__root"
  ],
  [
    "track",
    "seed-progress-circle__track"
  ],
  [
    "range",
    "seed-progress-circle__range"
  ]
];

const defaultVariant = {
  "tone": "neutral",
  "size": 40
};

const compoundVariants = [];

const progressCircleVariantMap = {
  "tone": [
    "neutral",
    "brand",
    "staticWhite",
    "inherit"
  ],
  "size": [
    "24",
    "40",
    "inherit"
  ]
};

function progressCircle(props) {
  return Object.fromEntries(
    progressCircleSlotNames.map(([slot, className]) => {
      return [
        slot,
        createClassName(className, mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(progressCircle, { splitVariantProps: (props) => splitVariantProps(props, progressCircleVariantMap) });

// @recipe(seed): progress-circle

export { progressCircle, progressCircleVariantMap };
