'use client';
import { jsx } from 'react/jsx-runtime';
import clsx from 'clsx';
import * as React from 'react';
import { useStyleProps } from '../../utils/styled.js';
import { Slot } from '@radix-ui/react-slot';

const Box = React.forwardRef((props, ref) => {
  const { style, restProps } = useStyleProps(props);
  const { as: Comp = "div", asChild = false, className, ...nativeProps } = restProps;
  if (asChild) {
    return /* @__PURE__ */ jsx(Slot, { ref, className: clsx("seed-box", className), style, ...nativeProps });
  }
  return /* @__PURE__ */ jsx(Comp, { ref, className: clsx("seed-box", className), style, ...nativeProps });
});

export { Box };
