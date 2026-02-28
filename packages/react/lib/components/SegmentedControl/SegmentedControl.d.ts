import { SegmentedControlVariantProps } from '@grape-design/css/recipes/segmented-control';
import { PrimitiveProps } from '@grape-design/react-primitive';
import { SegmentedControl as SegmentedControlPrimitive } from '@grape-design/react-segmented-control';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
export interface SegmentedControlRootProps extends SegmentedControlVariantProps, SegmentedControlPrimitive.RootProps {
}
export declare const SegmentedControlRoot: ForwardRefExoticComponent<SegmentedControlRootProps & RefAttributes<HTMLDivElement>>;
export interface SegmentedControlIndicatorProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const SegmentedControlIndicator: ForwardRefExoticComponent<SegmentedControlIndicatorProps & RefAttributes<HTMLDivElement>>;
export interface SegmentedControlItemProps extends SegmentedControlPrimitive.ItemProps {
}
export declare const SegmentedControlItem: ForwardRefExoticComponent<SegmentedControlItemProps & RefAttributes<HTMLLabelElement>>;
export interface SegmentedControlItemHiddenInputProps extends SegmentedControlPrimitive.ItemHiddenInputProps {
}
export declare const SegmentedControlItemHiddenInput: ForwardRefExoticComponent<SegmentedControlPrimitive.ItemHiddenInputProps & RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=SegmentedControl.d.ts.map