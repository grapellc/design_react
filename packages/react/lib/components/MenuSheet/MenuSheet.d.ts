import { Dialog as DialogPrimitive } from '@grape-design/react-dialog';
import { PrimitiveProps } from '@grape-design/react-primitive';
import { MenuSheetVariantProps } from '@grape-design/css/recipes/menu-sheet';
import { MenuSheetItemVariantProps } from '@grape-design/css/recipes/menu-sheet-item';
import * as React from "react";
export interface MenuSheetRootProps extends MenuSheetVariantProps, DialogPrimitive.RootProps {
    /**
     * @default true
     */
    lazyMount?: DialogPrimitive.RootProps["lazyMount"];
    /**
     * @default true
     */
    unmountOnExit?: DialogPrimitive.RootProps["unmountOnExit"];
}
export declare const MenuSheetRoot: React.ForwardRefExoticComponent<MenuSheetRootProps>;
export interface MenuSheetTriggerProps extends DialogPrimitive.TriggerProps {
}
export declare const MenuSheetTrigger: React.ForwardRefExoticComponent<DialogPrimitive.TriggerProps & React.RefAttributes<HTMLButtonElement>>;
export interface MenuSheetPositionerProps extends DialogPrimitive.PositionerProps {
}
export declare const MenuSheetPositioner: React.ForwardRefExoticComponent<MenuSheetPositionerProps & React.RefAttributes<HTMLDivElement>>;
export interface MenuSheetBackdropProps extends DialogPrimitive.BackdropProps {
}
export declare const MenuSheetBackdrop: React.ForwardRefExoticComponent<MenuSheetBackdropProps & React.RefAttributes<HTMLDivElement>>;
export interface MenuSheetContentProps extends DialogPrimitive.ContentProps, Pick<MenuSheetItemVariantProps, "labelAlign"> {
}
export declare const MenuSheetContent: React.ForwardRefExoticComponent<MenuSheetContentProps & React.RefAttributes<HTMLDivElement>>;
export interface MenuSheetHeaderProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const MenuSheetHeader: React.ForwardRefExoticComponent<MenuSheetHeaderProps & React.RefAttributes<HTMLDivElement>>;
export interface MenuSheetTitleProps extends DialogPrimitive.TitleProps {
}
export declare const MenuSheetTitle: React.ForwardRefExoticComponent<MenuSheetTitleProps & React.RefAttributes<HTMLHeadingElement>>;
export interface MenuSheetDescriptionProps extends DialogPrimitive.DescriptionProps {
}
export declare const MenuSheetDescription: React.ForwardRefExoticComponent<MenuSheetDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
export interface MenuSheetListProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const MenuSheetList: React.ForwardRefExoticComponent<MenuSheetListProps & React.RefAttributes<HTMLDivElement>>;
export interface MenuSheetGroupProps extends React.HTMLAttributes<HTMLDivElement>, Pick<MenuSheetItemVariantProps, "labelAlign"> {
}
export declare const MenuSheetGroup: React.ForwardRefExoticComponent<MenuSheetGroupProps & React.RefAttributes<HTMLDivElement>>;
export interface MenuSheetItemProps extends PrimitiveProps, MenuSheetItemVariantProps, React.HTMLAttributes<HTMLButtonElement> {
}
export declare const MenuSheetItem: React.ForwardRefExoticComponent<MenuSheetItemProps & React.RefAttributes<HTMLButtonElement>>;
export interface MenuSheetItemContentProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const MenuSheetItemContent: React.ForwardRefExoticComponent<MenuSheetItemContentProps & React.RefAttributes<HTMLDivElement>>;
export interface MenuSheetItemLabelProps extends PrimitiveProps, React.HTMLAttributes<HTMLSpanElement> {
}
export declare const MenuSheetItemLabel: React.ForwardRefExoticComponent<MenuSheetItemLabelProps & React.RefAttributes<HTMLSpanElement>>;
export interface MenuSheetItemDescriptionProps extends PrimitiveProps, React.HTMLAttributes<HTMLSpanElement> {
}
export declare const MenuSheetItemDescription: React.ForwardRefExoticComponent<MenuSheetItemDescriptionProps & React.RefAttributes<HTMLSpanElement>>;
export interface MenuSheetFooterProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const MenuSheetFooter: React.ForwardRefExoticComponent<MenuSheetFooterProps & React.RefAttributes<HTMLDivElement>>;
export interface MenuSheetCloseButtonProps extends DialogPrimitive.CloseButtonProps {
}
export declare const MenuSheetCloseButton: React.ForwardRefExoticComponent<MenuSheetCloseButtonProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MenuSheet.d.ts.map