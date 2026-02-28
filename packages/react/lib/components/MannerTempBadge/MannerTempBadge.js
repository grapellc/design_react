'use client';
import { mannerTempBadge } from '@grape-design/css/recipes/manner-temp-badge';
import { Primitive } from '@grape-design/react-primitive';
import { createRecipeContext } from '../../utils/createRecipeContext.js';

const { withContext } = createRecipeContext(mannerTempBadge);
const MannerTempBadge = withContext(Primitive.span);

export { MannerTempBadge };
