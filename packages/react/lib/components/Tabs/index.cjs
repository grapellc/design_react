'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const Tabs = require('./Tabs.cjs');
const reactTabs = require('@seed-design/react-tabs');
const Tabs_namespace = require('./Tabs.namespace.cjs');



exports.TabsCarousel = Tabs.TabsCarousel;
exports.TabsCarouselCamera = Tabs.TabsCarouselCamera;
exports.TabsContent = Tabs.TabsContent;
exports.TabsIndicator = Tabs.TabsIndicator;
exports.TabsList = Tabs.TabsList;
exports.TabsRoot = Tabs.TabsRoot;
exports.TabsTrigger = Tabs.TabsTrigger;
Object.defineProperty(exports, "tabsCarouselPreventDrag", {
  enumerable: true,
  get: () => reactTabs.tabsCarouselPreventDrag
});
exports.Tabs = Tabs_namespace;
