'use client';
import { jsx, jsxs } from 'react/jsx-runtime';
import { imageFrame } from '@seed-design/css/recipes/image-frame';
import { imageFrameIcon } from '@seed-design/css/recipes/image-frame-icon';
import { imageFrameIndicator } from '@seed-design/css/recipes/image-frame-indicator';
import { imageFrameReactionButton } from '@seed-design/css/recipes/image-frame-reaction-button';
import { imageFrameFloater } from '@seed-design/css/vars/component';
import { Image } from '@seed-design/react-image';
import { Toggle } from '@seed-design/react-toggle';
import clsx from 'clsx';
import * as React from 'react';
import { AspectRatio } from '../AspectRatio/AspectRatio.js';
import { Badge } from '../Badge/Badge.js';
import { Float } from '../Float/Float.js';
import { Icon } from '../Icon/Icon.js';

const ImageFrame = React.forwardRef(
  ({
    ratio = 4 / 3,
    stroke,
    rounded,
    src,
    alt,
    fallback,
    className,
    loading,
    decoding,
    crossOrigin,
    referrerPolicy,
    sizes,
    srcSet,
    onLoad,
    onError,
    children,
    ...rest
  }, ref) => {
    return /* @__PURE__ */ jsx(AspectRatio, { ref, ratio, className, ...rest, children: /* @__PURE__ */ jsxs(Image.Root, { className: imageFrame({ stroke, rounded }), children: [
      /* @__PURE__ */ jsx(
        Image.Content,
        {
          src,
          alt,
          loading,
          decoding,
          crossOrigin,
          referrerPolicy,
          sizes,
          srcSet,
          onLoad,
          onError
        }
      ),
      fallback && /* @__PURE__ */ jsx(Image.Fallback, { children: fallback }),
      children
    ] }) });
  }
);
ImageFrame.displayName = "ImageFrame";
const ImageFrameFloater = React.forwardRef(
  ({
    offsetX = imageFrameFloater.base.enabled.root.offset,
    offsetY = imageFrameFloater.base.enabled.root.offset,
    ...rest
  }, ref) => {
    return /* @__PURE__ */ jsx(Float, { ref, offsetX, offsetY, ...rest });
  }
);
ImageFrameFloater.displayName = "ImageFrameFloater";
const ImageFrameBadge = React.forwardRef(
  (props, ref) => {
    return /* @__PURE__ */ jsx(Badge, { ref, ...props });
  }
);
ImageFrameBadge.displayName = "ImageFrameBadge";
const ImageFrameIcon = React.forwardRef(
  ({ svg, className, ...rest }, ref) => {
    return /* @__PURE__ */ jsx("span", { ref, className: clsx(imageFrameIcon(), className), ...rest, children: /* @__PURE__ */ jsx(Icon, { svg }) });
  }
);
ImageFrameIcon.displayName = "ImageFrameIcon";
const ImageFrameIndicator = React.forwardRef(
  ({ children, className, ...rest }, ref) => {
    return /* @__PURE__ */ jsx("span", { ref, className: clsx(imageFrameIndicator(), className), ...rest, children });
  }
);
ImageFrameIndicator.displayName = "ImageFrameIndicator";
const HeartFillPath = "M15.5452 10C11.7873 10 9.25 12.9484 9.25 16.6267C9.25 19.8754 11.1219 22.0952 13.1877 23.969C13.7807 24.5069 14.4438 25.0617 15.095 25.6066C15.5434 25.9817 15.9862 26.3522 16.3967 26.7093C17.4501 27.6257 18.4191 28.557 19.1995 29.5994C19.3886 29.8518 19.6856 30.0003 20.001 30C20.3163 29.9997 20.6131 29.8507 20.8016 29.5979C21.5785 28.5562 22.5453 27.6253 23.598 26.7091C24.0105 26.35 24.4568 25.9766 24.9089 25.5984C25.5573 25.0559 26.2176 24.5035 26.807 23.9693C28.8739 22.096 30.75 19.8761 30.75 16.6267C30.75 12.9484 28.2127 10 24.4548 10C22.6365 10 21.1002 11.0545 20 12.4906C18.8998 11.0545 17.3635 10 15.5452 10Z";
const HeartOutlineStrokePath = "M15.5452 12C13.0342 12 11.25 13.905 11.25 16.6267C11.25 18.9912 12.5659 20.7048 14.5314 22.4876C15.1157 23.0176 15.7038 23.5087 16.3148 24.019C16.7646 24.3946 17.2269 24.7807 17.7093 25.2003C18.4947 25.8835 19.2814 26.6141 19.9988 27.4215C20.7144 26.614 21.5001 25.8836 22.2849 25.2005C22.7714 24.7771 23.2368 24.3885 23.6895 24.0105C24.2967 23.5035 24.8813 23.0154 25.4639 22.4874C27.4317 20.704 28.75 18.9906 28.75 16.6267C28.75 13.905 26.9658 12 24.4548 12C23.069 12 21.747 12.8325 20.8919 14.5189C20.7215 14.8549 20.3768 15.0667 20 15.0667C19.6233 15.0667 19.2785 14.8549 19.1081 14.5189C18.2531 12.8325 16.931 12 15.5452 12ZM9.25 16.6267C9.25 12.9484 11.7873 10 15.5452 10C17.3146 10 18.8683 10.8364 20 12.2306C21.1317 10.8364 22.6854 10 24.4548 10C28.2127 10 30.75 12.9484 30.75 16.6267C30.75 19.8761 28.8739 22.096 26.807 23.9693C26.2176 24.5035 25.5573 25.0559 24.9089 25.5984C24.4568 25.9766 24.0105 26.35 23.598 26.7091C22.5453 27.6253 21.5785 28.5562 20.8016 29.5979C20.6131 29.8507 20.3163 29.9997 20.001 30C19.6856 30.0003 19.3886 29.8518 19.1995 29.5994C18.4191 28.557 17.4501 27.6257 16.3967 26.7093C15.9862 26.3522 15.5434 25.9817 15.095 25.6066C14.4438 25.0617 13.7807 24.5069 13.1877 23.969C11.1219 22.0952 9.25 19.8754 9.25 16.6267Z";
const UnselectedHeartIcon = () => /* @__PURE__ */ jsxs("svg", { viewBox: "8 9 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children: [
  /* @__PURE__ */ jsx("path", { d: HeartFillPath, fill: "black", fillOpacity: "0.063" }),
  /* @__PURE__ */ jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: HeartOutlineStrokePath, fill: "white" })
] });
const SelectedHeartIcon = () => {
  const id = React.useId();
  const gradientId = `seed-heart-gradient${id.replace(/:/g, "")}`;
  return /* @__PURE__ */ jsxs("svg", { viewBox: "8 9 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx("path", { d: HeartFillPath, fill: `url(#${gradientId})` }),
    /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs(
      "linearGradient",
      {
        id: gradientId,
        x1: "7",
        y1: "8.5",
        x2: "26.0974",
        y2: "10.5391",
        gradientUnits: "userSpaceOnUse",
        children: [
          /* @__PURE__ */ jsx("stop", { stopColor: "#FF9A56" }),
          /* @__PURE__ */ jsx("stop", { offset: "1", stopColor: "#FF6600" })
        ]
      }
    ) })
  ] });
};
const ImageFrameReactionButton = React.forwardRef(({ className, pressed, ...rest }, ref) => {
  return /* @__PURE__ */ jsx(
    Toggle.Root,
    {
      ref,
      className: clsx(imageFrameReactionButton(), className),
      pressed,
      ...rest,
      children: /* @__PURE__ */ jsx(Icon, { svg: pressed ? /* @__PURE__ */ jsx(SelectedHeartIcon, {}) : /* @__PURE__ */ jsx(UnselectedHeartIcon, {}) })
    }
  );
});
ImageFrameReactionButton.displayName = "ImageFrameReactionButton";

export { ImageFrame, ImageFrameBadge, ImageFrameFloater, ImageFrameIcon, ImageFrameIndicator, ImageFrameReactionButton };
