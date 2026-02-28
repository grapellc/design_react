'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const reactPrimitive = require('@grape-design/react-primitive');
const fab = require('@grape-design/css/recipes/fab');
const createRecipeContext = require('../../utils/createRecipeContext.cjs');

const { withContext } = createRecipeContext.createRecipeContext(fab.fab);
const Fab = withContext(reactPrimitive.Primitive.button);

exports.Fab = Fab;
