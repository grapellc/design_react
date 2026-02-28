'use client';
import { segmentedControl } from '@grape-design/css/recipes/segmented-control';
import { Primitive } from '@grape-design/react-primitive';
import { SegmentedControl } from '@grape-design/react-segmented-control';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';

const { withProvider, withContext } = createSlotRecipeContext(segmentedControl);
const SegmentedControlRoot = withProvider(
  SegmentedControl.Root,
  "root"
);
const SegmentedControlIndicator = withContext(Primitive.div, "indicator");
const SegmentedControlItem = withContext(
  SegmentedControl.Item,
  "item"
);
const SegmentedControlItemHiddenInput = SegmentedControl.ItemHiddenInput;

export { SegmentedControlIndicator, SegmentedControlItem, SegmentedControlItemHiddenInput, SegmentedControlRoot };
