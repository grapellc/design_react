'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const inlineBanner = require('@seed-design/css/recipes/inline-banner');
const reactPrimitive = require('@seed-design/react-primitive');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');
const useDismissible = require('../private/useDismissible.cjs');

const { withContext, withProvider } = createSlotRecipeContext.createSlotRecipeContext(inlineBanner.inlineBanner);
const InlineBannerRoot = withProvider(
  useDismissible.DismissibleRoot,
  "root"
);
const InlineBannerContent = withContext(
  reactPrimitive.Primitive.div,
  "content"
);
const InlineBannerTitle = withContext(
  reactPrimitive.Primitive.span,
  "title"
);
const InlineBannerDescription = withContext(
  reactPrimitive.Primitive.span,
  "description"
);
const InlineBannerLink = withContext(
  reactPrimitive.Primitive.button,
  "link"
);
const InlineBannerCloseButton = withContext(
  useDismissible.DismissibleCloseButton,
  "closeButton"
);

exports.InlineBannerCloseButton = InlineBannerCloseButton;
exports.InlineBannerContent = InlineBannerContent;
exports.InlineBannerDescription = InlineBannerDescription;
exports.InlineBannerLink = InlineBannerLink;
exports.InlineBannerRoot = InlineBannerRoot;
exports.InlineBannerTitle = InlineBannerTitle;
