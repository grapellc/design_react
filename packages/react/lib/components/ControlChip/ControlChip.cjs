'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const controlChip = require('@grape-design/css/recipes/control-chip');
const reactPrimitive = require('@grape-design/react-primitive');
const createRecipeContext = require('../../utils/createRecipeContext.cjs');
const Icon = require('../Icon/Icon.cjs');

const { withContext } = createRecipeContext.createRecipeContext(controlChip.controlChip);
const ControlChip = Icon.withIconRequired(
  withContext(reactPrimitive.Primitive.button),
  (props) => props.layout === "iconOnly"
);
ControlChip.displayName = "ControlChip";

exports.ControlChip = ControlChip;
