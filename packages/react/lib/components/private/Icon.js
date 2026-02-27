'use client';
import { jsx } from 'react/jsx-runtime';
import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';

const InternalIcon = forwardRef(
  ({ svg, ...otherProps }, ref) => {
    return /* @__PURE__ */ jsx(Slot, { ref, "aria-hidden": true, ...otherProps, children: svg });
  }
);

export { InternalIcon };
