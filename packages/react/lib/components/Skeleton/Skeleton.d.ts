import { PrimitiveProps } from '@seed-design/react-primitive';
import { SkeletonVariantProps } from '@grape-design/css/recipes/skeleton';
import { StyleProps } from '../../utils/styled';
import type * as React from "react";
export interface SkeletonProps extends SkeletonVariantProps, PrimitiveProps, Pick<StyleProps, "height" | "width">, Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
}
export declare const Skeleton: React.ForwardRefExoticComponent<SkeletonProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Skeleton.d.ts.map