'use client';
import { ProgressCircle } from '@seed-design/react-progress';
import { progressCircle } from '@seed-design/css/recipes/progress-circle';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';

const { withContext, withProvider } = createSlotRecipeContext(progressCircle);
const ProgressCircleRoot = withProvider(
  ProgressCircle.Root,
  "root"
);
const ProgressCircleTrack = withContext(
  ProgressCircle.Track,
  "track"
);
const ProgressCircleRange = withContext(
  ProgressCircle.Range,
  "range"
);

export { ProgressCircleRange, ProgressCircleRoot, ProgressCircleTrack };
