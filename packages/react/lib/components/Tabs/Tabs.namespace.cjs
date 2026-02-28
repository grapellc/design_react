'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const Tabs = require('./Tabs.cjs');
const reactTabs = require('@grape-design/react-tabs');



exports.Carousel = Tabs.TabsCarousel;
exports.CarouselCamera = Tabs.TabsCarouselCamera;
exports.Content = Tabs.TabsContent;
exports.Indicator = Tabs.TabsIndicator;
exports.List = Tabs.TabsList;
exports.Root = Tabs.TabsRoot;
exports.Trigger = Tabs.TabsTrigger;
Object.defineProperty(exports, "carouselPreventDrag", {
  enumerable: true,
  get: () => reactTabs.tabsCarouselPreventDrag
});
