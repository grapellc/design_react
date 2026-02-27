import { ChipVariantProps } from '@seed-design/css/recipes/chip';
import { PrimitiveProps } from '@seed-design/react-primitive';
import type * as React from "react";
export interface ChipRootProps extends PrimitiveProps, ChipVariantProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
}
export declare const ChipRoot: React.ForwardRefExoticComponent<Omit<ChipRootProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export interface ChipLabelProps extends PrimitiveProps, React.HTMLAttributes<HTMLSpanElement> {
}
export declare const ChipLabel: React.ForwardRefExoticComponent<ChipLabelProps & React.RefAttributes<HTMLSpanElement>>;
export interface ChipPrefixIconProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const ChipPrefixIcon: React.ForwardRefExoticComponent<ChipPrefixIconProps & React.RefAttributes<HTMLDivElement>>;
export interface ChipPrefixAvatarProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const ChipPrefixAvatar: React.ForwardRefExoticComponent<ChipPrefixAvatarProps & React.RefAttributes<HTMLDivElement>>;
export interface ChipSuffixIconProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const ChipSuffixIcon: React.ForwardRefExoticComponent<ChipSuffixIconProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Chip.d.ts.map