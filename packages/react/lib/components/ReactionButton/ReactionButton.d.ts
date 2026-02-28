import { ReactionButtonVariantProps } from '@grape-design/css/recipes/reaction-button';
import { Toggle as TogglePrimitive } from '@grape-design/react-toggle';
import { UsePendingButtonProps } from '../LoadingIndicator/usePendingButton';
import * as React from "react";
export interface ReactionButtonProps extends ReactionButtonVariantProps, UsePendingButtonProps, TogglePrimitive.RootProps {
}
export declare const ReactionButton: React.ForwardRefExoticComponent<ReactionButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=ReactionButton.d.ts.map