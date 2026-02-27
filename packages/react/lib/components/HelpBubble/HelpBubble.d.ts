import { Popover as PopoverPrimitive } from '@seed-design/react-popover';
import { PrimitiveProps } from '@seed-design/react-primitive';
import { HelpBubbleVariantProps } from '@seed-design/css/recipes/help-bubble';
import { StyleProps } from '../../utils/styled';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
export interface HelpBubbleRootProps extends HelpBubbleVariantProps, PopoverPrimitive.RootProps {
    /**
     * @default "top"
     */
    placement?: PopoverPrimitive.RootProps["placement"];
    /**
     * @default 4
     */
    gutter?: PopoverPrimitive.RootProps["gutter"];
    /**
     * @default 16
     */
    overflowPadding?: PopoverPrimitive.RootProps["overflowPadding"];
    /**
     * @default 14
     */
    arrowPadding?: PopoverPrimitive.RootProps["arrowPadding"];
}
export declare const HelpBubbleRoot: ForwardRefExoticComponent<HelpBubbleRootProps>;
export interface HelpBubbleAnchorProps extends PopoverPrimitive.AnchorProps {
}
export declare const HelpBubbleAnchor: ForwardRefExoticComponent<PopoverPrimitive.AnchorProps & RefAttributes<HTMLDivElement>>;
export interface HelpBubbleTriggerProps extends PopoverPrimitive.TriggerProps {
}
export declare const HelpBubbleTrigger: ForwardRefExoticComponent<PopoverPrimitive.TriggerProps & RefAttributes<HTMLButtonElement>>;
export interface HelpBubblePositionerProps extends PopoverPrimitive.PositionerProps {
}
export declare const HelpBubblePositioner: ForwardRefExoticComponent<HelpBubblePositionerProps & RefAttributes<HTMLDivElement>>;
export interface HelpBubblePositionerPortalProps extends PopoverPrimitive.PositionerPortalProps {
}
export declare const HelpBubblePositionerPortal: ForwardRefExoticComponent<HelpBubblePositionerPortalProps & RefAttributes<HTMLDivElement>>;
export interface HelpBubbleContentProps extends PrimitiveProps, Pick<StyleProps, "maxWidth">, React.HTMLAttributes<HTMLDivElement> {
}
export declare const HelpBubbleContent: ForwardRefExoticComponent<HelpBubbleContentProps & RefAttributes<HTMLDivElement>>;
export interface HelpBubbleArrowProps extends PopoverPrimitive.ArrowProps {
}
export declare const HelpBubbleArrow: ForwardRefExoticComponent<HelpBubbleArrowProps & RefAttributes<HTMLDivElement>>;
export interface HelpBubbleArrowTipProps extends React.SVGProps<SVGSVGElement> {
    /**
     * radius of the arrow tip
     * @default 2
     */
    tipRadius?: number;
}
export declare const HelpBubbleArrowTip: ForwardRefExoticComponent<Omit<HelpBubbleArrowTipProps, "ref"> & RefAttributes<SVGSVGElement>>;
export interface HelpBubbleCloseButtonProps extends PopoverPrimitive.CloseButtonProps {
}
export declare const HelpBubbleCloseButton: ForwardRefExoticComponent<HelpBubbleCloseButtonProps & RefAttributes<HTMLButtonElement>>;
export interface HelpBubbleBodyProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const HelpBubbleBody: ForwardRefExoticComponent<HelpBubbleBodyProps & RefAttributes<HTMLDivElement>>;
export interface HelpBubbleTitleProps extends PrimitiveProps, React.HTMLAttributes<HTMLSpanElement> {
}
export declare const HelpBubbleTitle: ForwardRefExoticComponent<HelpBubbleTitleProps & RefAttributes<HTMLSpanElement>>;
export interface HelpBubbleDescriptionProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const HelpBubbleDescription: ForwardRefExoticComponent<HelpBubbleDescriptionProps & RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=HelpBubble.d.ts.map