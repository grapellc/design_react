import { SelectBoxVariantProps } from '@grape-design/css/recipes/select-box';
import { SelectBoxGroupVariantProps } from '@grape-design/css/recipes/select-box-group';
import { PrimitiveProps } from '@seed-design/react-primitive';
import { RadioGroup as RadioGroupPrimitive } from '@seed-design/react-radio-group';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
export interface RadioSelectBoxGroupProps extends SelectBoxGroupVariantProps, PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
    /**
     * Number of columns in the grid layout. When bigger than 1, child `RadioSelectBoxItem` will have a default layout of "vertical".
     * @default 1
     */
    columns?: number;
}
export declare const RadioSelectBoxGroup: ForwardRefExoticComponent<RadioSelectBoxGroupProps & RefAttributes<HTMLDivElement>>;
export interface RadioSelectBoxItemProps extends SelectBoxVariantProps, RadioGroupPrimitive.ItemProps {
    /**
     * Controls when the footer is visible.
     * @default "when-selected"
     */
    footerVisibility?: "when-selected" | "when-not-selected" | "always";
}
export declare const RadioSelectBoxItem: ForwardRefExoticComponent<RadioSelectBoxItemProps & RefAttributes<HTMLLabelElement>>;
export interface RadioSelectBoxTriggerProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const RadioSelectBoxTrigger: ForwardRefExoticComponent<RadioSelectBoxTriggerProps & RefAttributes<HTMLDivElement>>;
export interface RadioSelectBoxContentProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const RadioSelectBoxContent: ForwardRefExoticComponent<RadioSelectBoxContentProps & RefAttributes<HTMLDivElement>>;
export interface RadioSelectBoxBodyProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const RadioSelectBoxBody: ForwardRefExoticComponent<RadioSelectBoxBodyProps & RefAttributes<HTMLDivElement>>;
export interface RadioSelectBoxLabelProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const RadioSelectBoxLabel: ForwardRefExoticComponent<RadioSelectBoxLabelProps & RefAttributes<HTMLDivElement>>;
export interface RadioSelectBoxDescriptionProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const RadioSelectBoxDescription: ForwardRefExoticComponent<RadioSelectBoxDescriptionProps & RefAttributes<HTMLDivElement>>;
export interface RadioSelectBoxHiddenInputProps extends RadioGroupPrimitive.ItemHiddenInputProps {
}
export declare const RadioSelectBoxHiddenInput: ForwardRefExoticComponent<RadioSelectBoxHiddenInputProps & RefAttributes<HTMLInputElement>>;
export interface RadioSelectBoxFooterProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const RadioSelectBoxFooter: ForwardRefExoticComponent<RadioSelectBoxFooterProps & RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RadioSelectBox.d.ts.map