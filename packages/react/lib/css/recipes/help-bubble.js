'use client';
/* empty css                */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

const helpBubbleSlotNames = [
  [
    "positioner",
    "seed-help-bubble__positioner"
  ],
  [
    "content",
    "seed-help-bubble__content"
  ],
  [
    "arrow",
    "seed-help-bubble__arrow"
  ],
  [
    "arrowTip",
    "seed-help-bubble__arrowTip"
  ],
  [
    "body",
    "seed-help-bubble__body"
  ],
  [
    "title",
    "seed-help-bubble__title"
  ],
  [
    "description",
    "seed-help-bubble__description"
  ],
  [
    "closeButton",
    "seed-help-bubble__closeButton"
  ]
];

const defaultVariant = {};

const compoundVariants = [];

const helpBubbleVariantMap = {};

function helpBubble(props) {
  return Object.fromEntries(
    helpBubbleSlotNames.map(([slot, className]) => {
      return [
        slot,
        createClassName(className, mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(helpBubble, { splitVariantProps: (props) => splitVariantProps(props, helpBubbleVariantMap) });

// @recipe(seed): help-bubble

export { helpBubble, helpBubbleVariantMap };
