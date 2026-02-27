'use client';
import { jsx } from 'react/jsx-runtime';
import { Primitive } from '@seed-design/react-primitive';
import { Drawer } from '@seed-design/react-drawer';
import { bottomSheetHandle } from '@seed-design/css/recipes/bottom-sheet-handle';
import React__default from 'react';
import clsx from 'clsx';

const BottomSheetHandle = React__default.forwardRef(
  ({ className, ...props }, ref) => {
    const classNames = bottomSheetHandle();
    return /* @__PURE__ */ jsx(Drawer.Handle, { ref, className: clsx(classNames.root, className), ...props, children: /* @__PURE__ */ jsx(Primitive.div, { "aria-hidden": "true", className: classNames.touchArea }) });
  }
);
BottomSheetHandle.displayName = "BottomSheetHandle";

export { BottomSheetHandle };
