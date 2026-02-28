'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const tabs = require('@grape-design/css/recipes/tabs');
const reactTabs = require('@grape-design/react-tabs');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');

const { withProvider, withContext } = createSlotRecipeContext.createSlotRecipeContext(tabs.tabs);
const TabsRoot = withProvider(reactTabs.Tabs.Root, "root");
const TabsList = withContext(reactTabs.Tabs.List, "list");
const TabsTrigger = withContext(
  reactTabs.Tabs.Trigger,
  "trigger"
);
const TabsIndicator = withContext(
  reactTabs.Tabs.Indicator,
  "indicator"
);
const TabsContent = withContext(
  reactTabs.Tabs.Content,
  "content"
);
const TabsCarousel = withContext(
  reactTabs.Tabs.Carousel,
  "carousel"
);
const TabsCarouselCamera = withContext(
  reactTabs.Tabs.CarouselCamera,
  "carouselCamera"
);

exports.TabsCarousel = TabsCarousel;
exports.TabsCarouselCamera = TabsCarouselCamera;
exports.TabsContent = TabsContent;
exports.TabsIndicator = TabsIndicator;
exports.TabsList = TabsList;
exports.TabsRoot = TabsRoot;
exports.TabsTrigger = TabsTrigger;
