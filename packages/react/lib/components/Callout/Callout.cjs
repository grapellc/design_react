'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const reactPrimitive = require('@seed-design/react-primitive');
const callout = require('@seed-design/css/recipes/callout');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');
const useDismissible = require('../private/useDismissible.cjs');

const { withContext, withProvider } = createSlotRecipeContext.createSlotRecipeContext(callout.callout);
const CalloutRoot = withProvider(useDismissible.DismissibleRoot, "root");
const CalloutContent = withContext(
  reactPrimitive.Primitive.div,
  "content"
);
const CalloutTitle = withContext(
  reactPrimitive.Primitive.span,
  "title"
);
const CalloutDescription = withContext(
  reactPrimitive.Primitive.span,
  "description"
);
const CalloutLink = withContext(
  reactPrimitive.Primitive.button,
  "link"
);
const CalloutCloseButton = withContext(
  useDismissible.DismissibleCloseButton,
  "closeButton"
);

exports.CalloutCloseButton = CalloutCloseButton;
exports.CalloutContent = CalloutContent;
exports.CalloutDescription = CalloutDescription;
exports.CalloutLink = CalloutLink;
exports.CalloutRoot = CalloutRoot;
exports.CalloutTitle = CalloutTitle;
