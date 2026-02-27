import { CheckboxVariantProps } from '@grape-design/css/recipes/checkbox';
import { CheckmarkVariantProps } from '@grape-design/css/recipes/checkmark';
import { Checkbox as CheckboxPrimitive } from '@seed-design/react-checkbox';
import { PrimitiveProps } from '@seed-design/react-primitive';
import { CheckboxGroupVariantProps } from '@grape-design/css/recipes/checkbox-group';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
export interface CheckboxGroupProps extends CheckboxGroupVariantProps, PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const CheckboxGroup: ForwardRefExoticComponent<CheckboxGroupProps & RefAttributes<HTMLDivElement>>;
/**
 * @deprecated Use `regular` or `bold` instead of `default` or `stronger`
 */
type CheckboxVariantDeprecatedWeightProps = "default" | "stronger";
export interface CheckboxRootProps extends Omit<CheckboxVariantProps, "weight">, CheckmarkVariantProps, CheckboxPrimitive.RootProps {
    weight?: CheckboxVariantProps["weight"] | CheckboxVariantDeprecatedWeightProps;
}
export declare const CheckboxRoot: ForwardRefExoticComponent<CheckboxRootProps & RefAttributes<HTMLLabelElement>> & {
    Primitive: ForwardRefExoticComponent<CheckboxPrimitive.RootProps & RefAttributes<HTMLLabelElement>>;
};
/**
 * CheckboxControl combines Checkbox.Primitive with checkmark.root styling
 * This enables standalone usage of Checkbox.Control with variants
 */
export interface CheckboxControlProps extends CheckmarkVariantProps, CheckboxPrimitive.ControlProps {
}
export declare const CheckboxControl: ForwardRefExoticComponent<CheckboxControlProps & RefAttributes<HTMLDivElement>>;
export interface CheckboxIndicatorProps extends React.SVGAttributes<SVGSVGElement> {
    /**
     * The icon to display when the checkbox is unchecked.
     */
    unchecked?: React.ReactNode;
    /**
     * The icon to display when the checkbox is checked.
     */
    checked: React.ReactNode;
    /**
     * The icon to display when the checkbox is in an indeterminate state.
     */
    indeterminate?: React.ReactNode;
}
export declare const CheckboxIndicator: ForwardRefExoticComponent<CheckboxIndicatorProps & RefAttributes<SVGSVGElement>>;
export interface CheckboxLabelProps extends PrimitiveProps, React.HTMLAttributes<HTMLSpanElement> {
}
export declare const CheckboxLabel: ForwardRefExoticComponent<CheckboxLabelProps & RefAttributes<HTMLDivElement>>;
export interface CheckboxHiddenInputProps extends CheckboxPrimitive.HiddenInputProps {
}
export declare const CheckboxHiddenInput: ForwardRefExoticComponent<CheckboxPrimitive.HiddenInputProps & RefAttributes<HTMLInputElement>>;
export {};
//# sourceMappingURL=Checkbox.d.ts.map