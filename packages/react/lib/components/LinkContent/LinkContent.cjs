'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const linkContent = require('@grape-design/css/recipes/link-content');
const reactPrimitive = require('@grape-design/react-primitive');
const createRecipeContext = require('../../utils/createRecipeContext.cjs');
const styled = require('../../utils/styled.cjs');

const { withContext } = createRecipeContext.createRecipeContext(linkContent.linkContent);
const LinkContent = withContext(
  styled.withStyleProps(reactPrimitive.Primitive.span)
);

exports.LinkContent = LinkContent;
