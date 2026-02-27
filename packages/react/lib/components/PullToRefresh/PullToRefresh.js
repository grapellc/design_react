'use client';
import { PullToRefresh } from '@seed-design/react-pull-to-refresh';
import { pullToRefresh } from '@seed-design/css/recipes/pull-to-refresh';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';

const { withContext, withProvider } = createSlotRecipeContext(pullToRefresh);
const PullToRefreshRoot = withProvider(
  PullToRefresh.Root,
  "root"
);
const PullToRefreshIndicator = withContext(
  PullToRefresh.Indicator,
  "indicator"
);
const PullToRefreshContent = PullToRefresh.Content;

export { PullToRefreshContent, PullToRefreshIndicator, PullToRefreshRoot };
