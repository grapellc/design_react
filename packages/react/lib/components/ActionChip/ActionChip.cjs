'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const actionChip = require('@seed-design/css/recipes/action-chip');
const reactPrimitive = require('@seed-design/react-primitive');
const createRecipeContext = require('../../utils/createRecipeContext.cjs');
const Icon = require('../Icon/Icon.cjs');

const { withContext } = createRecipeContext.createRecipeContext(actionChip.actionChip);
const ActionChip = Icon.withIconRequired(
  withContext(reactPrimitive.Primitive.button),
  (props) => props.layout === "iconOnly"
);
ActionChip.displayName = "ActionChip";

exports.ActionChip = ActionChip;
