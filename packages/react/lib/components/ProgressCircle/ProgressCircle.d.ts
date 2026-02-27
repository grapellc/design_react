import { ProgressCircle as ProgressCirclePrimitive } from '@seed-design/react-progress';
import { ProgressCircleVariantProps } from '@seed-design/css/recipes/progress-circle';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
export interface ProgressCircleRootProps extends ProgressCirclePrimitive.RootProps, Omit<ProgressCircleVariantProps, "indeterminate"> {
}
export declare const ProgressCircleRoot: ForwardRefExoticComponent<ProgressCircleRootProps & RefAttributes<SVGSVGElement>>;
export interface ProgressCircleTrackProps extends ProgressCirclePrimitive.TrackProps {
}
export declare const ProgressCircleTrack: ForwardRefExoticComponent<ProgressCircleTrackProps & RefAttributes<SVGCircleElement>>;
export interface ProgressCircleRangeProps extends ProgressCirclePrimitive.RangeProps {
}
export declare const ProgressCircleRange: ForwardRefExoticComponent<ProgressCircleRangeProps & RefAttributes<SVGCircleElement>>;
//# sourceMappingURL=ProgressCircle.d.ts.map