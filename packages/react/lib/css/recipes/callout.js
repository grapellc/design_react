'use client';
/* empty css            */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

const calloutSlotNames = [
  [
    "root",
    "seed-callout__root"
  ],
  [
    "content",
    "seed-callout__content"
  ],
  [
    "title",
    "seed-callout__title"
  ],
  [
    "description",
    "seed-callout__description"
  ],
  [
    "link",
    "seed-callout__link"
  ],
  [
    "closeButton",
    "seed-callout__closeButton"
  ]
];

const defaultVariant = {
  "tone": "neutral"
};

const compoundVariants = [];

const calloutVariantMap = {
  "tone": [
    "neutral",
    "informative",
    "positive",
    "warning",
    "critical",
    "magic"
  ]
};

function callout(props) {
  return Object.fromEntries(
    calloutSlotNames.map(([slot, className]) => {
      return [
        slot,
        createClassName(className, mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(callout, { splitVariantProps: (props) => splitVariantProps(props, calloutVariantMap) });

// @recipe(seed): callout

export { callout, calloutVariantMap };
