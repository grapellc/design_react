'use client';
import { jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { Box } from '../Box/Box.js';
import clsx from 'clsx';
import { article } from '@seed-design/css/recipes/article';

const Article = React.forwardRef(
  ({ as = "article", className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      Box,
      {
        as,
        ref,
        className: clsx(article(), className),
        ...props
      }
    );
  }
);

export { Article };
