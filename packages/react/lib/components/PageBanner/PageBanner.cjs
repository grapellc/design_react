'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const pageBanner = require('@grape-design/css/recipes/page-banner');
const reactPrimitive = require('@seed-design/react-primitive');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');
const useDismissible = require('../private/useDismissible.cjs');
const clsx = require('clsx');

const { withContext, ClassNamesProvider } = createSlotRecipeContext.createSlotRecipeContext(pageBanner.pageBanner);
const PageBannerRoot = React.forwardRef(
  ({ className, ...props }, ref) => {
    if (props.variant === "solid" && props.tone === "magic") {
      console.error(
        `\`${props.tone}\` tone is not available for \`${props.variant}\` variant in PageBanner components. Please use variant="weak" or a different tone instead.`
      );
    }
    const [variantProps, otherProps] = pageBanner.pageBanner.splitVariantProps(props);
    const classNames = pageBanner.pageBanner(variantProps);
    return /* @__PURE__ */ jsxRuntime.jsx(ClassNamesProvider, { value: classNames, children: /* @__PURE__ */ jsxRuntime.jsx(useDismissible.DismissibleRoot, { className: clsx(classNames.root, className), ref, ...otherProps }) });
  }
);
const PageBannerContent = withContext(
  reactPrimitive.Primitive.div,
  "content"
);
const PageBannerBody = withContext(
  reactPrimitive.Primitive.div,
  "body"
);
const PageBannerTitle = withContext(
  reactPrimitive.Primitive.span,
  "title"
);
const PageBannerDescription = withContext(
  reactPrimitive.Primitive.span,
  "description"
);
const PageBannerButton = withContext(
  reactPrimitive.Primitive.button,
  "button"
);
const PageBannerCloseButton = withContext(
  useDismissible.DismissibleCloseButton,
  "closeButton"
);

exports.PageBannerBody = PageBannerBody;
exports.PageBannerButton = PageBannerButton;
exports.PageBannerCloseButton = PageBannerCloseButton;
exports.PageBannerContent = PageBannerContent;
exports.PageBannerDescription = PageBannerDescription;
exports.PageBannerRoot = PageBannerRoot;
exports.PageBannerTitle = PageBannerTitle;
