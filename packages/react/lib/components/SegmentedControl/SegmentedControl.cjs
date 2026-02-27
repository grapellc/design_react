'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const segmentedControl = require('@seed-design/css/recipes/segmented-control');
const reactPrimitive = require('@seed-design/react-primitive');
const reactSegmentedControl = require('@seed-design/react-segmented-control');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');

const { withProvider, withContext } = createSlotRecipeContext.createSlotRecipeContext(segmentedControl.segmentedControl);
const SegmentedControlRoot = withProvider(
  reactSegmentedControl.SegmentedControl.Root,
  "root"
);
const SegmentedControlIndicator = withContext(reactPrimitive.Primitive.div, "indicator");
const SegmentedControlItem = withContext(
  reactSegmentedControl.SegmentedControl.Item,
  "item"
);
const SegmentedControlItemHiddenInput = reactSegmentedControl.SegmentedControl.ItemHiddenInput;

exports.SegmentedControlIndicator = SegmentedControlIndicator;
exports.SegmentedControlItem = SegmentedControlItem;
exports.SegmentedControlItemHiddenInput = SegmentedControlItemHiddenInput;
exports.SegmentedControlRoot = SegmentedControlRoot;
