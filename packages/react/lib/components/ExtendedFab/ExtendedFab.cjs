'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const reactPrimitive = require('@seed-design/react-primitive');
const extendedFab = require('@seed-design/css/recipes/extended-fab');
const createRecipeContext = require('../../utils/createRecipeContext.cjs');

const { withContext } = createRecipeContext.createRecipeContext(extendedFab.extendedFab);
const ExtendedFab = withContext(reactPrimitive.Primitive.button, {
  defaultProps: {
    variant: "neutralSolid",
    size: "medium"
  }
});

exports.ExtendedFab = ExtendedFab;
