'use client';
import { jsx } from 'react/jsx-runtime';
import { visuallyHidden } from '@grape-design/dom-utils';
import { Primitive } from '@grape-design/react-primitive';
import { forwardRef } from 'react';

const VisuallyHidden = forwardRef((props, ref) => {
  const { style, ...otherProps } = props;
  return /* @__PURE__ */ jsx(Primitive.div, { ref, style: { ...visuallyHidden, ...style }, ...otherProps });
});

export { VisuallyHidden };
