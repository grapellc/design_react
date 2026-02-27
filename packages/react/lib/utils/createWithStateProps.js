'use client';
import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';

function createWithStateProps(useContexts) {
  return function withStateProps(Component) {
    const Node = forwardRef((props, ref) => {
      const stateProps = {};
      for (const contextConfig of useContexts) {
        if (typeof contextConfig === "function") {
          Object.assign(stateProps, contextConfig({ strict: true })?.stateProps);
        } else {
          const { useContext, strict = false } = contextConfig;
          Object.assign(stateProps, useContext({ strict })?.stateProps);
        }
      }
      return /* @__PURE__ */ jsx(Component, { ref, ...stateProps, ...props });
    });
    Node.displayName = Component.displayName || Component.name;
    return Node;
  };
}

export { createWithStateProps };
