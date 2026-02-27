import { BottomSheetVariantProps } from '@seed-design/css/recipes/bottom-sheet';
import { Drawer } from '@seed-design/react-drawer';
import { PrimitiveProps } from '@seed-design/react-primitive';
import { StyleProps } from '../../utils/styled';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { DialogTriggerProps } from '@radix-ui/react-dialog';
export interface BottomSheetRootProps extends BottomSheetVariantProps, Drawer.RootProps {
}
export declare const BottomSheetRoot: ForwardRefExoticComponent<BottomSheetRootProps>;
export interface BottomSheetTriggerProps extends Drawer.TriggerProps {
}
export declare const BottomSheetTrigger: ForwardRefExoticComponent< DialogTriggerProps & RefAttributes<HTMLButtonElement>>;
export interface BottomSheetPositionerProps extends Drawer.PositionerProps {
}
export declare const BottomSheetPositioner: ForwardRefExoticComponent<BottomSheetPositionerProps & RefAttributes<HTMLDivElement>>;
export interface BottomSheetBackdropProps extends Drawer.BackdropProps {
}
export declare const BottomSheetBackdrop: ForwardRefExoticComponent<BottomSheetBackdropProps & RefAttributes<HTMLDivElement>>;
export interface BottomSheetContentProps extends Drawer.ContentProps {
}
export declare const BottomSheetContent: ForwardRefExoticComponent<BottomSheetContentProps & RefAttributes<HTMLDivElement>>;
export interface BottomSheetHeaderProps extends Drawer.HeaderProps {
}
export declare const BottomSheetHeader: ForwardRefExoticComponent<BottomSheetHeaderProps & RefAttributes<HTMLDivElement>>;
export interface BottomSheetTitleProps extends Drawer.TitleProps {
}
export declare const BottomSheetTitle: ForwardRefExoticComponent<BottomSheetTitleProps & RefAttributes<HTMLHeadingElement>>;
export interface BottomSheetDescriptionProps extends Drawer.DescriptionProps {
}
export declare const BottomSheetDescription: ForwardRefExoticComponent<BottomSheetDescriptionProps & RefAttributes<HTMLParagraphElement>>;
export interface BottomSheetBodyProps extends PrimitiveProps, Pick<StyleProps, "paddingX" | "height" | "maxHeight" | "minHeight" | "justifyContent" | "alignItems">, React.HTMLAttributes<HTMLDivElement> {
}
export declare const BottomSheetBody: ForwardRefExoticComponent<BottomSheetBodyProps & RefAttributes<HTMLDivElement>>;
export interface BottomSheetFooterProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const BottomSheetFooter: ForwardRefExoticComponent<BottomSheetFooterProps & RefAttributes<HTMLDivElement>>;
export interface BottomSheetCloseButtonProps extends Drawer.CloseButtonProps {
}
export declare const BottomSheetCloseButton: ForwardRefExoticComponent<BottomSheetCloseButtonProps & RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=BottomSheet.d.ts.map