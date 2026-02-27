'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const reactPullToRefresh = require('@seed-design/react-pull-to-refresh');
const pullToRefresh = require('@seed-design/css/recipes/pull-to-refresh');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');

const { withContext, withProvider } = createSlotRecipeContext.createSlotRecipeContext(pullToRefresh.pullToRefresh);
const PullToRefreshRoot = withProvider(
  reactPullToRefresh.PullToRefresh.Root,
  "root"
);
const PullToRefreshIndicator = withContext(
  reactPullToRefresh.PullToRefresh.Indicator,
  "indicator"
);
const PullToRefreshContent = reactPullToRefresh.PullToRefresh.Content;

exports.PullToRefreshContent = PullToRefreshContent;
exports.PullToRefreshIndicator = PullToRefreshIndicator;
exports.PullToRefreshRoot = PullToRefreshRoot;
