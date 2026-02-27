'use client';
import { jsx } from 'react/jsx-runtime';
import { Primitive } from '@seed-design/react-primitive';
import clsx from 'clsx';
import { forwardRef } from 'react';

const Count = forwardRef((props, ref) => {
  const { className, ...otherProps } = props;
  return /* @__PURE__ */ jsx(Primitive.span, { ref, className: clsx("seed-count", className), ...otherProps });
});

export { Count };
