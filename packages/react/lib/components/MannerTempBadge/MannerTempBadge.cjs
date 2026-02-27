'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const mannerTempBadge = require('@grape-design/css/recipes/manner-temp-badge');
const reactPrimitive = require('@seed-design/react-primitive');
const createRecipeContext = require('../../utils/createRecipeContext.cjs');

const { withContext } = createRecipeContext.createRecipeContext(mannerTempBadge.mannerTempBadge);
const MannerTempBadge = withContext(reactPrimitive.Primitive.span);

exports.MannerTempBadge = MannerTempBadge;
