'use client';
import { jsx } from 'react/jsx-runtime';
import { Image } from '@grape-design/react-image';
import { Primitive } from '@grape-design/react-primitive';
import { avatar } from '@grape-design/css/recipes/avatar';
import { avatarStack } from '@grape-design/css/recipes/avatar-stack';
import clsx from 'clsx';
import * as React from 'react';
import { useMemo } from 'react';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';

const { PropsProvider, withProvider, withContext } = createSlotRecipeContext(avatar);
const AvatarRoot = withProvider(Image.Root, "root");
const AvatarImage = withContext(Image.Content, "image");
const AvatarFallback = withContext(
  Image.Fallback,
  "fallback"
);
const AvatarBadge = withContext(Primitive.div, "badge");
const AvatarStack = React.forwardRef(
  ({ className, children, size, ...otherProps }, ref) => {
    const classNames = avatarStack({ size });
    const avatars = React.Children.toArray(children);
    return /* @__PURE__ */ jsx(PropsProvider, { value: useMemo(() => ({ size }), [size]), children: /* @__PURE__ */ jsx("div", { ref, className: clsx(classNames.root, className), ...otherProps, children: avatars.map((avatar2, index) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: There is no unique key for each child
      /* @__PURE__ */ jsx("div", { className: classNames.item, children: avatar2 }, index)
    )) }) });
  }
);

export { AvatarBadge, AvatarFallback, AvatarImage, AvatarRoot, AvatarStack };
