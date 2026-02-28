import { SelectBoxVariantProps } from '@grape-design/css/recipes/select-box';
import { SelectBoxCheckmarkVariantProps } from '@grape-design/css/recipes/selectBoxCheckmark';
import { SelectBoxGroupVariantProps } from '@grape-design/css/recipes/select-box-group';
import { Checkbox as CheckboxPrimitive } from '@grape-design/react-checkbox';
import { PrimitiveProps } from '@grape-design/react-primitive';
import { InternalIconProps } from '../private/Icon';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
export interface CheckSelectBoxGroupProps extends SelectBoxGroupVariantProps, PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
    /**
     * Number of columns in the grid layout. When bigger than 1, child `CheckSelectBoxRoot` will have a default layout of "vertical".
     * @default 1
     */
    columns?: number;
}
export declare const CheckSelectBoxGroup: ForwardRefExoticComponent<CheckSelectBoxGroupProps & RefAttributes<HTMLDivElement>>;
export interface CheckSelectBoxRootProps extends SelectBoxVariantProps, CheckboxPrimitive.RootProps {
    /**
     * Controls when the footer is visible.
     * @default "when-selected"
     */
    footerVisibility?: "when-selected" | "when-not-selected" | "always";
}
export declare const CheckSelectBoxRoot: ForwardRefExoticComponent<CheckSelectBoxRootProps & RefAttributes<HTMLLabelElement>>;
export interface CheckSelectBoxTriggerProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const CheckSelectBoxTrigger: ForwardRefExoticComponent<CheckSelectBoxTriggerProps & RefAttributes<HTMLDivElement>>;
export interface CheckSelectBoxContentProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const CheckSelectBoxContent: ForwardRefExoticComponent<CheckSelectBoxContentProps & RefAttributes<HTMLDivElement>>;
export interface CheckSelectBoxBodyProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const CheckSelectBoxBody: ForwardRefExoticComponent<CheckSelectBoxBodyProps & RefAttributes<HTMLDivElement>>;
export interface CheckSelectBoxLabelProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const CheckSelectBoxLabel: ForwardRefExoticComponent<CheckSelectBoxLabelProps & RefAttributes<HTMLDivElement>>;
export interface CheckSelectBoxDescriptionProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const CheckSelectBoxDescription: ForwardRefExoticComponent<CheckSelectBoxDescriptionProps & RefAttributes<HTMLDivElement>>;
export interface CheckSelectBoxCheckmarkControlProps extends SelectBoxCheckmarkVariantProps, CheckboxPrimitive.ControlProps {
}
export declare const CheckSelectBoxCheckmarkControl: ForwardRefExoticComponent<CheckSelectBoxCheckmarkControlProps & RefAttributes<HTMLDivElement>>;
export interface CheckSelectBoxCheckmarkIconProps extends InternalIconProps {
}
export declare const CheckSelectBoxCheckmarkIcon: ForwardRefExoticComponent<CheckSelectBoxCheckmarkIconProps & RefAttributes<SVGSVGElement>>;
export interface CheckSelectBoxHiddenInputProps extends CheckboxPrimitive.HiddenInputProps {
}
export declare const CheckSelectBoxHiddenInput: ForwardRefExoticComponent<CheckSelectBoxHiddenInputProps & RefAttributes<HTMLInputElement>>;
export interface CheckSelectBoxFooterProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const CheckSelectBoxFooter: ForwardRefExoticComponent<CheckSelectBoxFooterProps & RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CheckSelectBox.d.ts.map