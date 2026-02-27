'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const aspectRatio = require('@seed-design/css/recipes/aspect-ratio');
const clsx = require('clsx');
const React = require('react');
const Box = require('../Box/Box.cjs');

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

const AspectRatio = React__namespace.forwardRef(
  ({ ratio = 4 / 3, children, className, style, ...rest }, ref) => {
    const child = React__namespace.Children.only(children);
    const aspectRatio$1 = aspectRatio.aspectRatio();
    return /* @__PURE__ */ jsxRuntime.jsx(
      Box.Box,
      {
        ref,
        className: clsx(aspectRatio$1, className),
        position: "relative",
        overflowX: "hidden",
        overflowY: "hidden",
        style: {
          // NOTE: aspectRatio는 iOS 15+부터 지원하기 때문에 padding으로 ratio hack을 사용합니다.
          "--seed-aspect-ratio-padding": `${1 / ratio * 100}%`,
          ...style
        },
        ...rest,
        children: child
      }
    );
  }
);
AspectRatio.displayName = "AspectRatio";

exports.AspectRatio = AspectRatio;
