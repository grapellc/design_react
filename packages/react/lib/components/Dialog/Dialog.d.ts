import { Dialog as DialogPrimitive } from '@seed-design/react-dialog';
import { PrimitiveProps } from '@seed-design/react-primitive';
import { DialogVariantProps } from '@seed-design/css/recipes/dialog';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
export interface DialogRootProps extends DialogVariantProps, DialogPrimitive.RootProps {
    /**
     * @default true
     */
    lazyMount?: DialogPrimitive.RootProps["lazyMount"];
    /**
     * @default true
     */
    unmountOnExit?: DialogPrimitive.RootProps["unmountOnExit"];
}
export declare const DialogRoot: ForwardRefExoticComponent<DialogRootProps>;
export interface DialogTriggerProps extends DialogPrimitive.TriggerProps {
}
export declare const DialogTrigger: ForwardRefExoticComponent<DialogPrimitive.TriggerProps & RefAttributes<HTMLButtonElement>>;
export interface DialogPositionerProps extends DialogPrimitive.PositionerProps {
}
export declare const DialogPositioner: ForwardRefExoticComponent<DialogPositionerProps & RefAttributes<HTMLDivElement>>;
export interface DialogBackdropProps extends DialogPrimitive.BackdropProps {
}
export declare const DialogBackdrop: ForwardRefExoticComponent<DialogBackdropProps & RefAttributes<HTMLDivElement>>;
export interface DialogContentProps extends DialogPrimitive.ContentProps {
}
export declare const DialogContent: ForwardRefExoticComponent<DialogContentProps & RefAttributes<HTMLDivElement>>;
export interface DialogHeaderProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const DialogHeader: ForwardRefExoticComponent<DialogHeaderProps & RefAttributes<HTMLDivElement>>;
export interface DialogTitleProps extends DialogPrimitive.TitleProps {
}
export declare const DialogTitle: ForwardRefExoticComponent<DialogTitleProps & RefAttributes<HTMLHeadingElement>>;
export interface DialogDescriptionProps extends DialogPrimitive.DescriptionProps {
}
export declare const DialogDescription: ForwardRefExoticComponent<DialogDescriptionProps & RefAttributes<HTMLParagraphElement>>;
export interface DialogFooterProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const DialogFooter: ForwardRefExoticComponent<DialogFooterProps & RefAttributes<HTMLDivElement>>;
export interface DialogActionProps extends PrimitiveProps, React.HTMLAttributes<HTMLButtonElement> {
}
export declare const DialogAction: ForwardRefExoticComponent<DialogPrimitive.CloseButtonProps & RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=Dialog.d.ts.map