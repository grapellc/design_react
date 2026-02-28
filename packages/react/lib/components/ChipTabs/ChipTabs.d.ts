import { ChipTabsVariantProps } from '@grape-design/css/recipes/chip-tabs';
import { Tabs as TabsPrimitive } from '@grape-design/react-tabs';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
export interface ChipTabsRootProps extends ChipTabsVariantProps, TabsPrimitive.RootProps {
}
export declare const ChipTabsRoot: ForwardRefExoticComponent<ChipTabsRootProps & RefAttributes<HTMLDivElement>>;
export interface ChipTabsListProps extends TabsPrimitive.ListProps {
}
export declare const ChipTabsList: ForwardRefExoticComponent<ChipTabsListProps & RefAttributes<HTMLDivElement>>;
export interface ChipTabsTriggerProps extends TabsPrimitive.TriggerProps {
}
export declare const ChipTabsTrigger: ForwardRefExoticComponent<ChipTabsTriggerProps & RefAttributes<HTMLButtonElement>>;
export interface ChipTabsContentProps extends TabsPrimitive.ContentProps {
}
export declare const ChipTabsContent: ForwardRefExoticComponent<ChipTabsContentProps & RefAttributes<HTMLSpanElement>>;
export interface ChipTabsCarouselProps extends TabsPrimitive.CarouselProps {
}
export declare const ChipTabsCarousel: ForwardRefExoticComponent<ChipTabsCarouselProps & RefAttributes<HTMLDivElement>>;
export interface ChipTabsCarouselCameraProps extends TabsPrimitive.CarouselCameraProps {
}
export declare const ChipTabsCarouselCamera: ForwardRefExoticComponent<ChipTabsCarouselCameraProps & RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ChipTabs.d.ts.map