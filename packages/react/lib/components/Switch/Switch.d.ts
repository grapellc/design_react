import { Switch as SwitchPrimitive } from '@grape-design/react-switch';
import { SwitchVariantProps } from '@grape-design/css/recipes/switch';
import { SwitchmarkVariantProps } from '@grape-design/css/recipes/switchmark';
import { PrimitiveProps } from '@grape-design/react-primitive';
import { default as React } from 'react';
/**
 * @deprecated Use `16` or `32` instead of `small` or `medium`.
 */
type SwitchVariantDeprecatedSizeProps = "small" | "medium";
export interface SwitchRootProps extends Omit<SwitchVariantProps, "size">, Omit<SwitchmarkVariantProps, "size">, SwitchPrimitive.RootProps {
    size?: SwitchVariantProps["size"] | SwitchVariantDeprecatedSizeProps;
}
export declare const SwitchRoot: React.ForwardRefExoticComponent<SwitchRootProps & React.RefAttributes<HTMLLabelElement>>;
export interface SwitchControlProps extends SwitchmarkVariantProps, SwitchPrimitive.ControlProps {
}
export declare const SwitchControl: React.ForwardRefExoticComponent<SwitchControlProps & React.RefAttributes<HTMLDivElement>>;
export interface SwitchThumbProps extends SwitchPrimitive.ThumbProps {
}
export declare const SwitchThumb: React.ForwardRefExoticComponent<SwitchThumbProps & React.RefAttributes<HTMLDivElement>>;
export interface SwitchLabelProps extends PrimitiveProps, React.HTMLAttributes<HTMLSpanElement> {
}
export declare const SwitchLabel: React.ForwardRefExoticComponent<SwitchLabelProps & React.RefAttributes<HTMLSpanElement>>;
export interface SwitchHiddenInputProps extends SwitchPrimitive.HiddenInputProps {
}
export declare const SwitchHiddenInput: React.ForwardRefExoticComponent<SwitchPrimitive.HiddenInputProps & React.RefAttributes<HTMLInputElement>>;
export {};
//# sourceMappingURL=Switch.d.ts.map