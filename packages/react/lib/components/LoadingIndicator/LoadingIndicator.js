'use client';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { mergeProps } from '@seed-design/dom-utils';
import { Primitive } from '@seed-design/react-primitive';
import { forwardRef } from 'react';
import { usePendingButtonContext } from './usePendingButton.js';

const LoadingIndicator = forwardRef((props, ref) => {
  const { indicator, children, ...otherProps } = props;
  const { stateProps } = usePendingButtonContext();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Primitive.span,
      {
        ref,
        ...mergeProps(stateProps, { className: "seed-loading-indicator" }, otherProps),
        children: indicator
      }
    ),
    /* @__PURE__ */ jsx(Primitive.span, { style: { opacity: 0, display: "inherit", gap: "inherit" }, children })
  ] });
});

export { LoadingIndicator };
