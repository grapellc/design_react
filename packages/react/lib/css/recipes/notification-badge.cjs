'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

;/* empty css                         */
const shared = require('./shared.cjs');

const defaultVariant = {
  "size": "large"
};

const compoundVariants = [];

const notificationBadgeVariantMap = {
  "size": [
    "small",
    "large"
  ]
};

function notificationBadge(props) {
  return shared.createClassName(
    "seed-notification-badge",
    shared.mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(notificationBadge, { splitVariantProps: (props) => shared.splitVariantProps(props, notificationBadgeVariantMap) });

// @recipe(seed): notification-badge

exports.notificationBadge = notificationBadge;
exports.notificationBadgeVariantMap = notificationBadgeVariantMap;
