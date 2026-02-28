'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const reactPrimitive = require('@grape-design/react-primitive');
const skeleton = require('@grape-design/css/recipes/skeleton');
const createRecipeContext = require('../../utils/createRecipeContext.cjs');
const styled = require('../../utils/styled.cjs');

const { withContext } = createRecipeContext.createRecipeContext(skeleton.skeleton);
const Skeleton = withContext(styled.withStyleProps(reactPrimitive.Primitive.div));

exports.Skeleton = Skeleton;
