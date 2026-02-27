'use client';
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

export { memoize };
