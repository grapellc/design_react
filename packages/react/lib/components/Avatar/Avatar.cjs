'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const reactImage = require('@grape-design/react-image');
const reactPrimitive = require('@grape-design/react-primitive');
const avatar = require('@grape-design/css/recipes/avatar');
const avatarStack = require('@grape-design/css/recipes/avatar-stack');
const clsx = require('clsx');
const React = require('react');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');

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

const { PropsProvider, withProvider, withContext } = createSlotRecipeContext.createSlotRecipeContext(avatar.avatar);
const AvatarRoot = withProvider(reactImage.Image.Root, "root");
const AvatarImage = withContext(reactImage.Image.Content, "image");
const AvatarFallback = withContext(
  reactImage.Image.Fallback,
  "fallback"
);
const AvatarBadge = withContext(reactPrimitive.Primitive.div, "badge");
const AvatarStack = React__namespace.forwardRef(
  ({ className, children, size, ...otherProps }, ref) => {
    const classNames = avatarStack.avatarStack({ size });
    const avatars = React__namespace.Children.toArray(children);
    return /* @__PURE__ */ jsxRuntime.jsx(PropsProvider, { value: React.useMemo(() => ({ size }), [size]), children: /* @__PURE__ */ jsxRuntime.jsx("div", { ref, className: clsx(classNames.root, className), ...otherProps, children: avatars.map((avatar2, index) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: There is no unique key for each child
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: classNames.item, children: avatar2 }, index)
    )) }) });
  }
);

exports.AvatarBadge = AvatarBadge;
exports.AvatarFallback = AvatarFallback;
exports.AvatarImage = AvatarImage;
exports.AvatarRoot = AvatarRoot;
exports.AvatarStack = AvatarStack;
