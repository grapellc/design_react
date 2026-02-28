'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const notificationBadge = require('@grape-design/css/recipes/notification-badge');
const notificationBadgePositioner = require('@grape-design/css/recipes/notification-badge-positioner');
const reactPrimitive = require('@grape-design/react-primitive');
const clsx = require('clsx');
const React = require('react');
const createRecipeContext = require('../../utils/createRecipeContext.cjs');

function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
  if (e) {
    for (const k in e) {
      if (k !== 'default') {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}

const React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

const { withContext, PropsProvider } = createRecipeContext.createRecipeContext(notificationBadge.notificationBadge);
const NotificationBadge = withContext(
  reactPrimitive.Primitive.span
);
const NotificationBadgePositioner = React__namespace.forwardRef((props, ref) => {
  const { attach, size, className, ...otherProps } = props;
  const positionerClassName = notificationBadgePositioner.notificationBadgePositioner({ attach, size });
  return /* @__PURE__ */ jsxRuntime.jsx(PropsProvider, { value: React.useMemo(() => ({ size }), [size]), children: /* @__PURE__ */ jsxRuntime.jsx(reactPrimitive.Primitive.span, { ref, className: clsx(positionerClassName, className), ...otherProps }) });
});

exports.NotificationBadge = NotificationBadge;
exports.NotificationBadgePositioner = NotificationBadgePositioner;
