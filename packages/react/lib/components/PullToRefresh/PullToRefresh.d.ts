import { PullToRefresh as PullToRefreshPrimitive } from '@grape-design/react-pull-to-refresh';
import { PullToRefreshVariantProps } from '@grape-design/css/recipes/pull-to-refresh';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
export interface PullToRefreshRootProps extends PullToRefreshVariantProps, PullToRefreshPrimitive.RootProps {
}
export declare const PullToRefreshRoot: ForwardRefExoticComponent<PullToRefreshRootProps & RefAttributes<HTMLDivElement>>;
export interface PullToRefreshIndicatorProps extends PullToRefreshPrimitive.IndicatorProps {
}
export declare const PullToRefreshIndicator: ForwardRefExoticComponent<PullToRefreshIndicatorProps & RefAttributes<HTMLDivElement>>;
export interface PullToRefreshContentProps extends PullToRefreshPrimitive.ContentProps {
}
export declare const PullToRefreshContent: ForwardRefExoticComponent<PullToRefreshPrimitive.ContentProps & RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PullToRefresh.d.ts.map