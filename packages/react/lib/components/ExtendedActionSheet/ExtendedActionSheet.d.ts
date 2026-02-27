import { Dialog as DialogPrimitive } from '@seed-design/react-dialog';
import { PrimitiveProps } from '@seed-design/react-primitive';
import { ExtendedActionSheetVariantProps } from '@seed-design/css/recipes/extended-action-sheet';
import { ExtendedActionSheetItemVariantProps } from '@seed-design/css/recipes/extended-action-sheet-item';
import type * as React from "react";
/**
 * @deprecated Use `MenuSheet` instead.
 */
export interface ExtendedActionSheetRootProps extends ExtendedActionSheetVariantProps, DialogPrimitive.RootProps {
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
export declare const ExtendedActionSheetRoot: React.ForwardRefExoticComponent<ExtendedActionSheetRootProps>;
/**
 * @deprecated Use `MenuSheet` instead.
 */
export interface ExtendedActionSheetTriggerProps extends DialogPrimitive.TriggerProps {
}
/**
 * @deprecated Use `MenuSheet` instead.
 */
export declare const ExtendedActionSheetTrigger: React.ForwardRefExoticComponent<DialogPrimitive.TriggerProps & React.RefAttributes<HTMLButtonElement>>;
/**
 * @deprecated Use `MenuSheet` instead.
 */
export interface ExtendedActionSheetPositionerProps extends DialogPrimitive.PositionerProps {
}
/**
 * @deprecated Use `MenuSheet` instead.
 */
export declare const ExtendedActionSheetPositioner: React.ForwardRefExoticComponent<ExtendedActionSheetPositionerProps & React.RefAttributes<HTMLDivElement>>;
/**
 * @deprecated Use `MenuSheet` instead.
 */
export interface ExtendedActionSheetBackdropProps extends DialogPrimitive.BackdropProps {
}
/**
 * @deprecated Use `MenuSheet` instead.
 */
export declare const ExtendedActionSheetBackdrop: React.ForwardRefExoticComponent<ExtendedActionSheetBackdropProps & React.RefAttributes<HTMLDivElement>>;
/**
 * @deprecated Use `MenuSheet` instead.
 */
export interface ExtendedActionSheetContentProps extends DialogPrimitive.ContentProps {
}
/**
 * @deprecated Use `MenuSheet` instead.
 */
export declare const ExtendedActionSheetContent: React.ForwardRefExoticComponent<ExtendedActionSheetContentProps & React.RefAttributes<HTMLDivElement>>;
/**
 * @deprecated Use `MenuSheet` instead.
 */
export interface ExtendedActionSheetHeaderProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
/**
 * @deprecated Use `MenuSheet` instead.
 */
export declare const ExtendedActionSheetHeader: React.ForwardRefExoticComponent<ExtendedActionSheetHeaderProps & React.RefAttributes<HTMLDivElement>>;
/**
 * @deprecated Use `MenuSheet` instead.
 */
export interface ExtendedActionSheetTitleProps extends DialogPrimitive.TitleProps {
}
/**
 * @deprecated Use `MenuSheet` instead.
 */
export declare const ExtendedActionSheetTitle: React.ForwardRefExoticComponent<ExtendedActionSheetTitleProps & React.RefAttributes<HTMLHeadingElement>>;
/**
 * @deprecated Use `MenuSheet` instead.
 */
export interface ExtendedActionSheetListProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
/**
 * @deprecated Use `MenuSheet` instead.
 */
export declare const ExtendedActionSheetList: React.ForwardRefExoticComponent<ExtendedActionSheetListProps & React.RefAttributes<HTMLDivElement>>;
/**
 * @deprecated Use `MenuSheet` instead.
 */
export interface ExtendedActionSheetGroupProps extends React.HTMLAttributes<HTMLDivElement> {
}
/**
 * @deprecated Use `MenuSheet` instead.
 */
export declare const ExtendedActionSheetGroup: React.ForwardRefExoticComponent<ExtendedActionSheetGroupProps & React.RefAttributes<HTMLDivElement>>;
/**
 * @deprecated Use `MenuSheet` instead.
 */
export interface ExtendedActionSheetItemProps extends PrimitiveProps, ExtendedActionSheetItemVariantProps, React.HTMLAttributes<HTMLButtonElement> {
}
/**
 * @deprecated Use `MenuSheet` instead.
 */
export declare const ExtendedActionSheetItem: React.ForwardRefExoticComponent<ExtendedActionSheetItemProps & React.RefAttributes<HTMLButtonElement>>;
/**
 * @deprecated Use `MenuSheet` instead.
 */
export interface ExtendedActionSheetFooterProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
/**
 * @deprecated Use `MenuSheet` instead.
 */
export declare const ExtendedActionSheetFooter: React.ForwardRefExoticComponent<ExtendedActionSheetFooterProps & React.RefAttributes<HTMLDivElement>>;
/**
 * @deprecated Use `MenuSheet` instead.
 */
export interface ExtendedActionSheetCloseButtonProps extends DialogPrimitive.CloseButtonProps {
}
/**
 * @deprecated Use `MenuSheet` instead.
 */
export declare const ExtendedActionSheetCloseButton: React.ForwardRefExoticComponent<ExtendedActionSheetCloseButtonProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ExtendedActionSheet.d.ts.map