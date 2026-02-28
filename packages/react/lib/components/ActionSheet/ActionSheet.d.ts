import { ActionSheetVariantProps } from '@grape-design/css/recipes/action-sheet';
import { ActionSheetItemVariantProps } from '@grape-design/css/recipes/action-sheet-item';
import { Dialog as DialogPrimitive } from '@grape-design/react-dialog';
import { PrimitiveProps } from '@grape-design/react-primitive';
import type * as React from "react";
/**
 * @deprecated Use `MenuSheet` instead.
 */
export interface ActionSheetRootProps extends ActionSheetVariantProps, DialogPrimitive.RootProps {
    /**
     * @default true
     */
    lazyMount?: DialogPrimitive.RootProps["lazyMount"];
    /**
     * @default true
     */
    unmountOnExit?: DialogPrimitive.RootProps["unmountOnExit"];
}
/**
 * @deprecated Use `MenuSheet` instead.
 */
export declare const ActionSheetRoot: React.ForwardRefExoticComponent<ActionSheetRootProps>;
/**
 * @deprecated Use `MenuSheet` instead.
 */
export interface ActionSheetTriggerProps extends DialogPrimitive.TriggerProps {
}
/**
 * @deprecated Use `MenuSheet` instead.
 */
export declare const ActionSheetTrigger: React.ForwardRefExoticComponent<DialogPrimitive.TriggerProps & React.RefAttributes<HTMLButtonElement>>;
/**
 * @deprecated Use `MenuSheet` instead.
 */
export interface ActionSheetPositionerProps extends DialogPrimitive.PositionerProps {
}
/**
 * @deprecated Use `MenuSheet` instead.
 */
export declare const ActionSheetPositioner: React.ForwardRefExoticComponent<ActionSheetPositionerProps & React.RefAttributes<HTMLDivElement>>;
/**
 * @deprecated Use `MenuSheet` instead.
 */
export interface ActionSheetBackdropProps extends DialogPrimitive.BackdropProps {
}
/**
 * @deprecated Use `MenuSheet` instead.
 */
export declare const ActionSheetBackdrop: React.ForwardRefExoticComponent<ActionSheetBackdropProps & React.RefAttributes<HTMLDivElement>>;
/**
 * @deprecated Use `MenuSheet` instead.
 */
export interface ActionSheetContentProps extends DialogPrimitive.ContentProps {
}
/**
 * @deprecated Use `MenuSheet` instead.
 */
export declare const ActionSheetContent: React.ForwardRefExoticComponent<ActionSheetContentProps & React.RefAttributes<HTMLDivElement>>;
/**
 * @deprecated Use `MenuSheet` instead.
 */
export interface ActionSheetHeaderProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
/**
 * @deprecated Use `MenuSheet` instead.
 */
export declare const ActionSheetHeader: React.ForwardRefExoticComponent<ActionSheetHeaderProps & React.RefAttributes<HTMLDivElement>>;
/**
 * @deprecated Use `MenuSheet` instead.
 */
export interface ActionSheetTitleProps extends DialogPrimitive.TitleProps {
}
/**
 * @deprecated Use `MenuSheet` instead.
 */
export declare const ActionSheetTitle: React.ForwardRefExoticComponent<ActionSheetTitleProps & React.RefAttributes<HTMLHeadingElement>>;
/**
 * @deprecated Use `MenuSheet` instead.
 */
export interface ActionSheetDescriptionProps extends DialogPrimitive.DescriptionProps {
}
/**
 * @deprecated Use `MenuSheet` instead.
 */
export declare const ActionSheetDescription: React.ForwardRefExoticComponent<ActionSheetDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
/**
 * @deprecated Use `MenuSheet` instead.
 */
export interface ActionSheetListProps extends React.HTMLAttributes<HTMLDivElement> {
}
/**
 * @deprecated Use `MenuSheet` instead.
 */
export declare const ActionSheetList: React.ForwardRefExoticComponent<ActionSheetListProps & React.RefAttributes<HTMLDivElement>>;
/**
 * @deprecated Use `MenuSheet` instead.
 */
export interface ActionSheetItemProps extends PrimitiveProps, ActionSheetItemVariantProps, React.HTMLAttributes<HTMLButtonElement> {
}
/**
 * @deprecated Use `MenuSheet` instead.
 */
export declare const ActionSheetItem: React.ForwardRefExoticComponent<ActionSheetItemProps & React.RefAttributes<HTMLButtonElement>>;
/**
 * @deprecated Use `MenuSheet` instead.
 */
export interface ActionSheetCloseButtonProps extends DialogPrimitive.CloseButtonProps {
}
/**
 * @deprecated Use `MenuSheet` instead.
 */
export declare const ActionSheetCloseButton: React.ForwardRefExoticComponent<ActionSheetCloseButtonProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ActionSheet.d.ts.map