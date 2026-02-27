'use client';
import { controlChip } from '@grape-design/css/recipes/control-chip';
import { Primitive } from '@seed-design/react-primitive';
import { createRecipeContext } from '../../utils/createRecipeContext.js';
import { withIconRequired } from '../Icon/Icon.js';

const { withContext } = createRecipeContext(controlChip);
const ControlChip = withIconRequired(
  withContext(Primitive.button),
  (props) => props.layout === "iconOnly"
);
ControlChip.displayName = "ControlChip";

export { ControlChip };
