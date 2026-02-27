'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const reactProgress = require('@seed-design/react-progress');
const progressCircle = require('@seed-design/css/recipes/progress-circle');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');

const { withContext, withProvider } = createSlotRecipeContext.createSlotRecipeContext(progressCircle.progressCircle);
const ProgressCircleRoot = withProvider(
  reactProgress.ProgressCircle.Root,
  "root"
);
const ProgressCircleTrack = withContext(
  reactProgress.ProgressCircle.Track,
  "track"
);
const ProgressCircleRange = withContext(
  reactProgress.ProgressCircle.Range,
  "range"
);

exports.ProgressCircleRange = ProgressCircleRange;
exports.ProgressCircleRoot = ProgressCircleRoot;
exports.ProgressCircleTrack = ProgressCircleTrack;
