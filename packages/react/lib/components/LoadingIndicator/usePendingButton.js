'use client';
import { elementProps } from '@grape-design/dom-utils';
import * as React from 'react';

function usePendingButton(props) {
  const { loading, disabled } = props;
  const stateProps = elementProps({
    "data-loading": loading ? "" : void 0,
    "data-disabled": disabled ? "" : void 0
  });
  return {
    loading,
    disabled,
    stateProps
  };
}
const PendingButtonContext = React.createContext(null);
const PendingButtonProvider = PendingButtonContext.Provider;
const usePendingButtonContext = () => {
  const context = React.useContext(PendingButtonContext);
  if (context === null) {
    throw new Error("usePendingButtonContext should be used within UsePendingButtonProvider");
  }
  return context;
};

export { PendingButtonProvider, usePendingButton, usePendingButtonContext };
