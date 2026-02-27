import { FloatingActionButtonVariantProps } from '@seed-design/css/recipes/floating-action-button';
import { PrimitiveProps } from '@seed-design/react-primitive';
import { InternalIconProps } from '../private/Icon';
import type * as React from "react";
export interface FloatingActionButtonRootProps extends FloatingActionButtonVariantProps, PrimitiveProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
}
export declare const FloatingActionButtonRoot: React.ForwardRefExoticComponent<FloatingActionButtonRootProps & React.RefAttributes<HTMLButtonElement>>;
export interface FloatingActionButtonIconProps extends InternalIconProps {
}
export declare const FloatingActionButtonIcon: React.ForwardRefExoticComponent<FloatingActionButtonIconProps & React.RefAttributes<HTMLButtonElement>>;
export interface FloatingActionButtonLabelProps extends PrimitiveProps, React.HTMLAttributes<HTMLSpanElement> {
}
export declare const FloatingActionButtonLabel: React.ForwardRefExoticComponent<FloatingActionButtonLabelProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=FloatingActionButton.d.ts.map