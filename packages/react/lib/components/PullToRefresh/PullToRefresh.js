'use client';
import { PullToRefresh } from '@grape-design/react-pull-to-refresh';
import { pullToRefresh } from '@grape-design/css/recipes/pull-to-refresh';
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
