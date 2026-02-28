'use client';
/* empty css           */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

const avatarSlotNames = [
  [
    "root",
    "seed-avatar__root"
  ],
  [
    "image",
    "seed-avatar__image"
  ],
  [
    "fallback",
    "seed-avatar__fallback"
  ],
  [
    "badge",
    "seed-avatar__badge"
  ]
];

const defaultVariant = {
  "size": 48,
  "badgeMask": "none"
};

const compoundVariants = [];

const avatarVariantMap = {
  "size": [
    "20",
    "24",
    "36",
    "42",
    "48",
    "64",
    "80",
    "96",
    "108"
  ],
  "badgeMask": [
    "none",
    "circle",
    "flower",
    "shield"
  ]
};

function avatar(props) {
  return Object.fromEntries(
    avatarSlotNames.map(([slot, className]) => {
      return [
        slot,
        createClassName(className, mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(avatar, { splitVariantProps: (props) => splitVariantProps(props, avatarVariantMap) });

// @recipe(seed): avatar

export { avatar, avatarVariantMap };
