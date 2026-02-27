'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');

function createWithStateProps(useContexts) {
  return function withStateProps(Component) {
    const Node = React.forwardRef((props, ref) => {
      const stateProps = {};
      for (const contextConfig of useContexts) {
        if (typeof contextConfig === "function") {
          Object.assign(stateProps, contextConfig({ strict: true })?.stateProps);
        } else {
          const { useContext, strict = false } = contextConfig;
          Object.assign(stateProps, useContext({ strict })?.stateProps);
        }
      }
      return /* @__PURE__ */ jsxRuntime.jsx(Component, { ref, ...stateProps, ...props });
    });
    Node.displayName = Component.displayName || Component.name;
    return Node;
  };
}

exports.createWithStateProps = createWithStateProps;
