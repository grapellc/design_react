'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css             */
const shared = require('./shared.cjs');

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
        shared.createClassName(className, shared.mergeVariants(defaultVariant, props), compoundVariants),
      ];
    }),
  );
}

Object.assign(avatar, { splitVariantProps: (props) => shared.splitVariantProps(props, avatarVariantMap) });

// @recipe(seed): avatar

exports.avatar = avatar;
exports.avatarVariantMap = avatarVariantMap;
