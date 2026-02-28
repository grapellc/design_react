'use client';
/* empty css             */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

const snackbarSlotNames = [
  [
    "root",
    "seed-snackbar__root"
  ],
  [
    "message",
    "seed-snackbar__message"
  ],
  [
    "prefixIcon",
    "seed-snackbar__prefixIcon"
  ],
  [
    "actionButton",
    "seed-snackbar__actionButton"
  ],
  [
    "content",
    "seed-snackbar__content"
  ]
];

const defaultVariant = {
  "variant": "default"
};

const compoundVariants = [];

const snackbarVariantMap = {
  "variant": [
    "default",
    "positive",
    "critical"
  ]
};

function snackbar(props) {
  return Object.fromEntries(
    snackbarSlotNames.map(([slot, className]) => {
      return [
        slot,
        createClassName(className, mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(snackbar, { splitVariantProps: (props) => splitVariantProps(props, snackbarVariantMap) });

// @recipe(seed): snackbar

export { snackbar, snackbarVariantMap };
