'use client';
import { Primitive } from '@grape-design/react-primitive';
import { skeleton } from '@grape-design/css/recipes/skeleton';
import { createRecipeContext } from '../../utils/createRecipeContext.js';
import { withStyleProps } from '../../utils/styled.js';

const { withContext } = createRecipeContext(skeleton);
const Skeleton = withContext(withStyleProps(Primitive.div));

export { Skeleton };
