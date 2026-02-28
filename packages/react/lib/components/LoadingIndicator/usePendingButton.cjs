'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const domUtils = require('@grape-design/dom-utils');
const React = require('react');

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

function usePendingButton(props) {
  const { loading, disabled } = props;
  const stateProps = domUtils.elementProps({
    "data-loading": loading ? "" : void 0,
    "data-disabled": disabled ? "" : void 0
  });
  return {
    loading,
    disabled,
    stateProps
  };
}
const PendingButtonContext = React__namespace.createContext(null);
const PendingButtonProvider = PendingButtonContext.Provider;
const usePendingButtonContext = () => {
  const context = React__namespace.useContext(PendingButtonContext);
  if (context === null) {
    throw new Error("usePendingButtonContext should be used within UsePendingButtonProvider");
  }
  return context;
};

exports.PendingButtonProvider = PendingButtonProvider;
exports.usePendingButton = usePendingButton;
exports.usePendingButtonContext = usePendingButtonContext;
