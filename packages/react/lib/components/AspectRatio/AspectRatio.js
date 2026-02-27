'use client';
import { jsx } from 'react/jsx-runtime';
import { aspectRatio } from '@seed-design/css/recipes/aspect-ratio';
import clsx from 'clsx';
import * as React from 'react';
import { Box } from '../Box/Box.js';

const AspectRatio = React.forwardRef(
  ({ ratio = 4 / 3, children, className, style, ...rest }, ref) => {
    const child = React.Children.only(children);
    const aspectRatio$1 = aspectRatio();
    return /* @__PURE__ */ jsx(
      Box,
      {
        ref,
        className: clsx(aspectRatio$1, className),
        position: "relative",
        overflowX: "hidden",
        overflowY: "hidden",
        style: {
          // NOTE: aspectRatio는 iOS 15+부터 지원하기 때문에 padding으로 ratio hack을 사용합니다.
          "--seed-aspect-ratio-padding": `${1 / ratio * 100}%`,
          ...style
        },
        ...rest,
        children: child
      }
    );
  }
);
AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
