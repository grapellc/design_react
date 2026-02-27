'use client';
import { jsx } from 'react/jsx-runtime';
import { notificationBadge } from '@seed-design/css/recipes/notification-badge';
import { notificationBadgePositioner } from '@seed-design/css/recipes/notification-badge-positioner';
import { Primitive } from '@seed-design/react-primitive';
import clsx from 'clsx';
import * as React from 'react';
import { useMemo } from 'react';
import { createRecipeContext } from '../../utils/createRecipeContext.js';

const { withContext, PropsProvider } = createRecipeContext(notificationBadge);
const NotificationBadge = withContext(
  Primitive.span
);
const NotificationBadgePositioner = React.forwardRef((props, ref) => {
  const { attach, size, className, ...otherProps } = props;
  const positionerClassName = notificationBadgePositioner({ attach, size });
  return /* @__PURE__ */ jsx(PropsProvider, { value: useMemo(() => ({ size }), [size]), children: /* @__PURE__ */ jsx(Primitive.span, { ref, className: clsx(positionerClassName, className), ...otherProps }) });
});

export { NotificationBadge, NotificationBadgePositioner };
