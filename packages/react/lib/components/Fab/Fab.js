'use client';
import { Primitive } from '@seed-design/react-primitive';
import { fab } from '@grape-design/css/recipes/fab';
import { createRecipeContext } from '../../utils/createRecipeContext.js';

const { withContext } = createRecipeContext(fab);
const Fab = withContext(Primitive.button);

export { Fab };
