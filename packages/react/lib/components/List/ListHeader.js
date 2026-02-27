'use client';
import { jsx } from 'react/jsx-runtime';
import { listHeader } from '@grape-design/css/recipes/list-header';
import { forwardRef } from 'react';
import clsx from 'clsx';

const ListHeader = forwardRef(
  ({ as: Comp = "div", ...props }, ref) => {
    const [variantProps, otherProps] = listHeader.splitVariantProps(props);
    const className = listHeader(variantProps);
    return /* @__PURE__ */ jsx(Comp, { ref, ...otherProps, className: clsx(className, props.className) });
  }
);
ListHeader.displayName = "ListHeader";

export { ListHeader };
