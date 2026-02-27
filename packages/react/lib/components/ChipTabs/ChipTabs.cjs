'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const chipTabs = require('@grape-design/css/recipes/chip-tabs');
const reactTabs = require('@seed-design/react-tabs');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');
const React = require('react');
const clsx = require('clsx');

const { ClassNamesProvider, withContext } = createSlotRecipeContext.createSlotRecipeContext(chipTabs.chipTabs);
const ChipTabsRoot = React.forwardRef(
  ({ className, ...props }, ref) => {
    if (process.env.NODE_ENV !== "production" && props.variant === "brandSolid") {
      console.warn(
        "[SEED Design System] ChipTabs variant='brandSolid' is deprecated and will be removed in @seed-design/react@1.3.0. Use variant='neutralSolid' or variant='neutralOutline' instead."
      );
    }
    const [variantProps, otherProps] = chipTabs.chipTabs.splitVariantProps(props);
    const classNames = chipTabs.chipTabs(variantProps);
    return /* @__PURE__ */ jsxRuntime.jsx(ClassNamesProvider, { value: classNames, children: /* @__PURE__ */ jsxRuntime.jsx(
      reactTabs.Tabs.Root,
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
  reactTabs.Tabs.List,
  "list"
);
const ChipTabsTrigger = withContext(
  reactTabs.Tabs.Trigger,
  "trigger"
);
const ChipTabsContent = withContext(
  reactTabs.Tabs.Content,
  "content"
);
const ChipTabsCarousel = withContext(
  reactTabs.Tabs.Carousel,
  "carousel"
);
const ChipTabsCarouselCamera = withContext(
  reactTabs.Tabs.CarouselCamera,
  "carouselCamera"
);

exports.ChipTabsCarousel = ChipTabsCarousel;
exports.ChipTabsCarouselCamera = ChipTabsCarouselCamera;
exports.ChipTabsContent = ChipTabsContent;
exports.ChipTabsList = ChipTabsList;
exports.ChipTabsRoot = ChipTabsRoot;
exports.ChipTabsTrigger = ChipTabsTrigger;
