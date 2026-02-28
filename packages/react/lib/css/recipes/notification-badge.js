'use client';
/* empty css                       */
import { splitVariantProps, createClassName, mergeVariants } from './shared.js';

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
  return createClassName(
    "seed-notification-badge",
    mergeVariants(defaultVariant, props),
    compoundVariants,
  );
}

Object.assign(notificationBadge, { splitVariantProps: (props) => splitVariantProps(props, notificationBadgeVariantMap) });

// @recipe(seed): notification-badge

export { notificationBadge, notificationBadgeVariantMap };
