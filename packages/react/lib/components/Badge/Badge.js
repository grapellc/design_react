'use client';
import { jsx } from 'react/jsx-runtime';
import { Primitive } from '@seed-design/react-primitive';
import { badge } from '@grape-design/css/recipes/badge';
import { forwardRef } from 'react';
import clsx from 'clsx';

const Badge = forwardRef(
  ({ className, children, ...props }, ref) => {
    const [variantProps, restProps] = badge.splitVariantProps(props);
    const { root, label } = badge(variantProps);
    return /* @__PURE__ */ jsx(Primitive.span, { className: clsx(root, className), ...restProps, ref, children: /* @__PURE__ */ jsx(Primitive.span, { className: label, children }) });
  }
);
Badge.displayName = "Badge";

export { Badge };
