'use client';
import { jsx } from 'react/jsx-runtime';
import { chipTabs } from '@seed-design/css/recipes/chip-tabs';
import { Tabs } from '@seed-design/react-tabs';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';
import { forwardRef } from 'react';
import clsx from 'clsx';

const { ClassNamesProvider, withContext } = createSlotRecipeContext(chipTabs);
const ChipTabsRoot = forwardRef(
  ({ className, ...props }, ref) => {
    if (process.env.NODE_ENV !== "production" && props.variant === "brandSolid") {
      console.warn(
        "[SEED Design System] ChipTabs variant='brandSolid' is deprecated and will be removed in @seed-design/react@1.3.0. Use variant='neutralSolid' or variant='neutralOutline' instead."
      );
    }
    const [variantProps, otherProps] = chipTabs.splitVariantProps(props);
    const classNames = chipTabs(variantProps);
    return /* @__PURE__ */ jsx(ClassNamesProvider, { value: classNames, children: /* @__PURE__ */ jsx(
      Tabs.Root,
      {
        ref,
        className: clsx(classNames.root, className),
        ...otherProps
      }
    ) });
  }
);
ChipTabsRoot.displayName = "ChipTabsRoot";
const ChipTabsList = withContext(
  Tabs.List,
  "list"
);
const ChipTabsTrigger = withContext(
  Tabs.Trigger,
  "trigger"
);
const ChipTabsContent = withContext(
  Tabs.Content,
  "content"
);
const ChipTabsCarousel = withContext(
  Tabs.Carousel,
  "carousel"
);
const ChipTabsCarouselCamera = withContext(
  Tabs.CarouselCamera,
  "carouselCamera"
);

export { ChipTabsCarousel, ChipTabsCarouselCamera, ChipTabsContent, ChipTabsList, ChipTabsRoot, ChipTabsTrigger };
