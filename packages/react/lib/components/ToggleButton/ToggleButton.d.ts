import { ToggleButtonVariantProps } from '@grape-design/css/recipes/toggle-button';
import { Toggle as TogglePrimitive } from '@grape-design/react-toggle';
import { UsePendingButtonProps } from '../LoadingIndicator/usePendingButton';
import * as React from "react";
export interface ToggleButtonProps extends ToggleButtonVariantProps, UsePendingButtonProps, TogglePrimitive.RootProps {
}
export declare const ToggleButton: React.ForwardRefExoticComponent<ToggleButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=ToggleButton.d.ts.map