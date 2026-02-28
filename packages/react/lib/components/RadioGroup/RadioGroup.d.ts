import { RadioVariantProps } from '@grape-design/css/recipes/radio';
import { RadioGroupVariantProps } from '@grape-design/css/recipes/radio-group';
import { RadiomarkVariantProps } from '@grape-design/css/recipes/radiomark';
import { RadioGroup as RadioGroupPrimitive } from '@grape-design/react-radio-group';
import { PrimitiveProps } from '@grape-design/react-primitive';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
export interface RadioGroupRootProps extends RadioGroupVariantProps, PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const RadioGroupRoot: ForwardRefExoticComponent<RadioGroupRootProps & RefAttributes<HTMLDivElement>>;
export interface RadioGroupItemProps extends RadioVariantProps, RadiomarkVariantProps, RadioGroupPrimitive.ItemProps {
}
export declare const RadioGroupItem: ForwardRefExoticComponent<RadioGroupItemProps & RefAttributes<HTMLLabelElement>> & {
    Primitive: ForwardRefExoticComponent<RadioGroupPrimitive.ItemProps & RefAttributes<HTMLLabelElement>>;
};
export interface RadioGroupItemLabelProps extends PrimitiveProps, React.HTMLAttributes<HTMLSpanElement> {
}
export declare const RadioGroupItemLabel: ForwardRefExoticComponent<RadioGroupItemLabelProps & RefAttributes<HTMLSpanElement>>;
export interface RadioGroupItemControlProps extends RadiomarkVariantProps, RadioGroupPrimitive.ItemControlProps {
}
export declare const RadioGroupItemControl: ForwardRefExoticComponent<RadioGroupItemControlProps & RefAttributes<HTMLDivElement>>;
export interface RadioGroupItemIndicatorProps extends React.SVGAttributes<SVGSVGElement> {
    /**
     * The icon to display when the radio is unchecked.
     */
    unchecked?: React.ReactNode;
    /**
     * The icon to display when the radio is checked.
     */
    checked?: React.ReactNode;
}
export declare const RadioGroupItemIndicator: ForwardRefExoticComponent<RadioGroupItemIndicatorProps & RefAttributes<SVGSVGElement>>;
export interface RadioGroupItemHiddenInputProps extends RadioGroupPrimitive.ItemHiddenInputProps {
}
export declare const RadioGroupItemHiddenInput: ForwardRefExoticComponent<RadioGroupPrimitive.ItemHiddenInputProps & RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=RadioGroup.d.ts.map