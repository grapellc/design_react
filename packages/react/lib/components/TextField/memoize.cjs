'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

function memoize(fn) {
  const cache = /* @__PURE__ */ new Map();
  return (arg) => {
    if (cache.has(arg)) {
      return cache.get(arg);
    }
    const result = fn(arg);
    cache.set(arg, result);
    return result;
  };
}

exports.memoize = memoize;
