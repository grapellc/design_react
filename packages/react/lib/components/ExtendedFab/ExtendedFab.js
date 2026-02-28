'use client';
import { Primitive } from '@grape-design/react-primitive';
import { extendedFab } from '@grape-design/css/recipes/extended-fab';
import { createRecipeContext } from '../../utils/createRecipeContext.js';

const { withContext } = createRecipeContext(extendedFab);
const ExtendedFab = withContext(Primitive.button, {
  defaultProps: {
    variant: "neutralSolid",
    size: "medium"
  }
});

export { ExtendedFab };
