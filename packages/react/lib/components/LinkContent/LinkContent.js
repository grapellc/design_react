'use client';
import { linkContent } from '@grape-design/css/recipes/link-content';
import { Primitive } from '@seed-design/react-primitive';
import { createRecipeContext } from '../../utils/createRecipeContext.js';
import { withStyleProps } from '../../utils/styled.js';

const { withContext } = createRecipeContext(linkContent);
const LinkContent = withContext(
  withStyleProps(Primitive.span)
);

export { LinkContent };
