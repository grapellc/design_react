'use client';
import { jsx } from 'react/jsx-runtime';
import { Primitive } from '@grape-design/react-primitive';
import clsx from 'clsx';
import { forwardRef } from 'react';

const ConsistentWidth = forwardRef((props, ref) => {
  const { className, ...otherProps } = props;
  return /* @__PURE__ */ jsx(
    Primitive.span,
    {
      "data-text": props.children,
      ref,
      className: clsx("seed-consistent-width", className),
      ...otherProps
    }
  );
});

export { ConsistentWidth };
