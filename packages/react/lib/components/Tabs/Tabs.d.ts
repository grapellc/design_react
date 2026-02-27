import { TabsVariantProps } from '@grape-design/css/recipes/tabs';
import { Tabs as TabsPrimitive } from '@seed-design/react-tabs';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
export interface TabsRootProps extends TabsVariantProps, TabsPrimitive.RootProps {
}
export declare const TabsRoot: ForwardRefExoticComponent<TabsRootProps & RefAttributes<HTMLDivElement>>;
export interface TabsListProps extends TabsPrimitive.ListProps {
}
export declare const TabsList: ForwardRefExoticComponent<TabsListProps & RefAttributes<HTMLDivElement>>;
export interface TabsTriggerProps extends TabsPrimitive.TriggerProps {
}
export declare const TabsTrigger: ForwardRefExoticComponent<TabsTriggerProps & RefAttributes<HTMLButtonElement>>;
export interface TabsIndicatorProps extends TabsPrimitive.IndicatorProps {
}
export declare const TabsIndicator: ForwardRefExoticComponent<TabsIndicatorProps & RefAttributes<HTMLSpanElement>>;
export interface TabsContentProps extends TabsPrimitive.ContentProps {
}
export declare const TabsContent: ForwardRefExoticComponent<TabsContentProps & RefAttributes<HTMLSpanElement>>;
export interface TabsCarouselProps extends TabsPrimitive.CarouselProps {
}
export declare const TabsCarousel: ForwardRefExoticComponent<TabsCarouselProps & RefAttributes<HTMLDivElement>>;
export interface TabsCarouselCameraProps extends TabsPrimitive.CarouselCameraProps {
}
export declare const TabsCarouselCamera: ForwardRefExoticComponent<TabsCarouselCameraProps & RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Tabs.d.ts.map