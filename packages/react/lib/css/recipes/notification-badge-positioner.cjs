'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                                    */
const shared = require('./shared.cjs');

const defaultVariant = {
  "size": "large",
  "attach": "icon"
};

const compoundVariants = [
  {
    "size": "large",
    "attach": "icon"
  },
  {
    "size": "small",
    "attach": "icon"
  },
  {
    "size": "large",
    "attach": "text"
  },
  {
    "size": "small",
    "attach": "text"
  }
];

const notificationBadgePositionerVariantMap = {
  "attach": [
    "icon",
    "text"
  ],
  "size": [
    "small",
    "large"
  ]
};

function notificationBadgePositioner(props) {
  return shared.createClassName(
    "seed-notification-badge-positioner",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(notificationBadgePositioner, { splitVariantProps: (props) => shared.splitVariantProps(props, notificationBadgePositionerVariantMap) });

// @recipe(seed): notification-badge-positioner

exports.notificationBadgePositioner = notificationBadgePositioner;
exports.notificationBadgePositionerVariantMap = notificationBadgePositionerVariantMap;
