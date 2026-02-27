'use client';
import { tabs } from '@seed-design/css/recipes/tabs';
import { Tabs } from '@seed-design/react-tabs';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';

const { withProvider, withContext } = createSlotRecipeContext(tabs);
const TabsRoot = withProvider(Tabs.Root, "root");
const TabsList = withContext(Tabs.List, "list");
const TabsTrigger = withContext(
  Tabs.Trigger,
  "trigger"
);
const TabsIndicator = withContext(
  Tabs.Indicator,
  "indicator"
);
const TabsContent = withContext(
  Tabs.Content,
  "content"
);
const TabsCarousel = withContext(
  Tabs.Carousel,
  "carousel"
);
const TabsCarouselCamera = withContext(
  Tabs.CarouselCamera,
  "carouselCamera"
);

export { TabsCarousel, TabsCarouselCamera, TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger };
