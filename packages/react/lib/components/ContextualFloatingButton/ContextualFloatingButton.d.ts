import { ContextualFloatingButtonVariantProps } from '@grape-design/css/recipes/contextual-floating-button';
import { PrimitiveProps } from '@grape-design/react-primitive';
import { UsePendingButtonProps } from '../LoadingIndicator/usePendingButton';
import * as React from "react";
export interface ContextualFloatingButtonProps extends ContextualFloatingButtonVariantProps, UsePendingButtonProps, PrimitiveProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
}
export declare const ContextualFloatingButton: React.ForwardRefExoticComponent<ContextualFloatingButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=ContextualFloatingButton.d.ts.map