'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const Box = require('../Box/Box.cjs');
const clsx = require('clsx');
const article = require('@seed-design/css/recipes/article');

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

const Article = React__namespace.forwardRef(
  ({ as = "article", className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      Box.Box,
      {
        as,
        ref,
        className: clsx(article.article(), className),
        ...props
      }
    );
  }
);

exports.Article = Article;
