import { ActionButtonVariantProps } from '@grape-design/css/recipes/action-button';
import { PrimitiveProps } from '@seed-design/react-primitive';
import { StyleProps } from '../../utils/styled';
import { UsePendingButtonProps } from '../LoadingIndicator/usePendingButton';
import { ScopedColorFg, ScopedColorPalette, FontWeight } from '@grape-design/css/vars';
import * as React from "react";
export interface ActionButtonProps extends ActionButtonVariantProps, UsePendingButtonProps, PrimitiveProps, Pick<StyleProps, "flexGrow" | "bleedX" | "bleedY">, React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Color of the label and icons inside the button.
     * Works only when `variant` is `ghost`.
     * @default "fg.neutral"
     */
    color?: ScopedColorFg | ScopedColorPalette;
    /**
     * Weight of the label.
     * Works only when `variant` is `ghost`.
     * @default "bold"
     */
    fontWeight?: FontWeight;
}
export declare const ActionButton: React.ForwardRefExoticComponent<ActionButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=ActionButton.d.ts.map