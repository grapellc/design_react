'use client';
import { jsx } from 'react/jsx-runtime';
import { visuallyHidden } from '@seed-design/dom-utils';
import { Primitive } from '@seed-design/react-primitive';
import { forwardRef } from 'react';

const VisuallyHidden = forwardRef((props, ref) => {
  const { style, ...otherProps } = props;
  return /* @__PURE__ */ jsx(Primitive.div, { ref, style: { ...visuallyHidden, ...style }, ...otherProps });
});

export { VisuallyHidden };
