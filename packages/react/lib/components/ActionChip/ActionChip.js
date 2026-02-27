'use client';
import { actionChip } from '@seed-design/css/recipes/action-chip';
import { Primitive } from '@seed-design/react-primitive';
import { createRecipeContext } from '../../utils/createRecipeContext.js';
import { withIconRequired } from '../Icon/Icon.js';

const { withContext } = createRecipeContext(actionChip);
const ActionChip = withIconRequired(
  withContext(Primitive.button),
  (props) => props.layout === "iconOnly"
);
ActionChip.displayName = "ActionChip";

export { ActionChip };
