'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const identityPlaceholder = require('@grape-design/css/recipes/identity-placeholder');
const domUtils = require('@grape-design/dom-utils');
const reactPrimitive = require('@grape-design/react-primitive');
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

const { useClassNames, withProvider } = createSlotRecipeContext.createSlotRecipeContext(identityPlaceholder.identityPlaceholder);
const IdentityPlaceholderRoot = withProvider(
  reactPrimitive.Primitive.div,
  "root"
);
const IdentityPlaceholderImage = React__namespace.forwardRef((props, ref) => {
  const classNames = useClassNames();
  return /* @__PURE__ */ jsxRuntime.jsx(
    "svg",
    {
      ref,
      viewBox: "0 0 640 640",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      role: "img",
      "aria-label": "Identity placeholder",
      ...domUtils.mergeProps({ className: classNames.image }, props),
      children: /* @__PURE__ */ jsxRuntime.jsx(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M481 301c0 56-29 106-72 135a264 264 0 0 1 175 248c0 18-118 38-264 38S56 702 56 684c0-114 73-211 174-248a162 162 0 1 1 251-135Zm-203-1c8 0 14-9 14-20s-6-20-14-20-15 9-15 20 7 20 15 20Zm83 0c8 0 15-9 15-20s-7-20-15-20-15 9-15 20 7 20 15 20Zm-88 25c4-2 9-1 11 4 4 7 15 19 36 19s32-12 36-19a8 8 0 1 1 15 8c-7 12-23 27-51 27s-44-15-50-27c-3-5-1-10 3-12Z"
        }
      )
    }
  );
});
IdentityPlaceholderImage.displayName = "IdentityPlaceholderImage";

exports.IdentityPlaceholderImage = IdentityPlaceholderImage;
exports.IdentityPlaceholderRoot = IdentityPlaceholderRoot;
