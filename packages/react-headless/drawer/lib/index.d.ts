import * as react_jsx_runtime from 'react/jsx-runtime';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { PrimitiveProps } from '@grape-design/react-primitive';
import * as React$1 from 'react';
import React__default from 'react';

interface DrawerReasonToDetailMap {
    closeButton: {
        event: MouseEvent;
    };
    escapeKeyDown: {
        event: KeyboardEvent;
    };
    interactOutside: {
        event: PointerEvent | FocusEvent;
    };
    drag: {
        event: PointerEvent;
    };
    handleClickOnLastSnapPoint: {
        event: MouseEvent;
    };
}
type DrawerChangeDetails = {
    [R in keyof DrawerReasonToDetailMap]: {
        reason?: R;
    } & DrawerReasonToDetailMap[R];
}[keyof DrawerReasonToDetailMap];
interface UseDrawerProps {
    activeSnapPoint?: number | string | null;
    setActiveSnapPoint?: (snapPoint: number | string | null) => void;
    children?: React__default.ReactNode;
    open?: boolean;
    /**
     * Number between 0 and 1 that determines when the drawer should be closed.
     * Example: threshold of 0.5 would close the drawer if the user swiped for 50% of the height of the drawer or more.
     * @default 0.25
     */
    closeThreshold?: number;
    /**
     * When `true` the `body` doesn't get any styles assigned from Drawer
     * @default true
     */
    noBodyStyles?: boolean;
    onOpenChange?: (open: boolean, details?: DrawerChangeDetails) => void;
    /**
     * Duration for which the drawer is not draggable after scrolling content inside of the drawer.
     * @default 500ms
     */
    scrollLockTimeout?: number;
    /**
     * When `true`, don't move the drawer upwards if there's space, but rather only change it's height so it's fully scrollable when the keyboard is open
     */
    fixed?: boolean;
    /**
     * When `true` only allows the drawer to be dragged by the `<Drawer.Handle />` component.
     * @default false
     */
    handleOnly?: boolean;
    /**
     * When `false` dragging, clicking outside, pressing esc, etc. will not close the drawer.
     * Use this in combination with the `open` prop, otherwise you won't be able to open/close the drawer.
     * @default true
     */
    dismissible?: boolean;
    onDrag?: (event: React__default.PointerEvent<HTMLDivElement>, percentageDragged: number) => void;
    onRelease?: (event: React__default.PointerEvent<HTMLDivElement>, open: boolean) => void;
    /**
     * When `false` it allows to interact with elements outside of the drawer without closing it.
     * @default true
     */
    modal?: boolean;
    nested?: boolean;
    onClose?: () => void;
    /**
     * Direction of the drawer. Can be `top` or `bottom`, `left`, `right`.
     * @default 'bottom'
     */
    direction?: "top" | "bottom" | "left" | "right";
    /**
     * Opened by default. Still reacts to `open` state changes
     * @default false
     */
    defaultOpen?: boolean;
    /**
     * When `true` Vaul will reposition inputs rather than scroll then into view if the keyboard is in the way.
     * Setting it to `false` will fall back to the default browser behavior.
     * @default true when {@link snapPoints} is defined
     */
    repositionInputs?: boolean;
    /**
     * Disabled velocity based swiping for snap points.
     * This means that a snap point won't be skipped even if the velocity is high enough.
     * Useful if each snap point in a drawer is equally important.
     * @default false
     */
    snapToSequentialPoint?: boolean;
    container?: HTMLElement | null;
    /**
     * Gets triggered after the open or close animation ends, it receives an `open` argument with the `open` state of the drawer by the time the function was triggered.
     * Useful to revert any state changes for example.
     */
    onAnimationEnd?: (open: boolean) => void;
    preventScrollRestoration?: boolean;
    autoFocus?: boolean;
    /**
     * Array of snap points to use.
     * Example: snapPoints={["100px", "200px", 1]} will use the snap points 100px, 200px and fully open (1 = 100% of the container).
     * @default undefined
     */
    snapPoints?: (number | string)[];
    /**
     * Index of the snap point to start fading from.
     * Example: fadeFromIndex={0} will start fading from the first snap point.
     * @default snapPoints.length - 1
     */
    fadeFromIndex?: number;
    /**
     * Whether to close the drawer when interacting outside of the drawer.
     * @default true
     */
    closeOnInteractOutside?: boolean;
    /**
     * Whether to close the drawer when pressing the escape key.
     * @default true
     */
    closeOnEscape?: boolean;
}
declare function useDrawer(props: UseDrawerProps): {
    activeSnapPoint: string | number;
    snapPoints: (string | number)[];
    setActiveSnapPoint: (value: string | number | ((prev: string | number) => string | number), details?: undefined) => void;
    drawerRef: React__default.MutableRefObject<HTMLDivElement>;
    overlayRef: React__default.MutableRefObject<HTMLDivElement>;
    shouldOverlayAnimate: boolean;
    onOpenChange: (open: boolean, details?: DrawerChangeDetails) => void;
    onPress: (event: React__default.PointerEvent<HTMLDivElement>) => void;
    onRelease: (event: React__default.PointerEvent<HTMLDivElement> | null) => void;
    onDrag: (event: React__default.PointerEvent<HTMLDivElement>) => void;
    dismissible: boolean;
    handleOnly: boolean;
    isOpen: boolean;
    isDragging: boolean;
    shouldFade: boolean;
    closeDrawer: (fromWithin?: boolean, details?: DrawerChangeDetails) => void;
    keyboardIsOpen: React__default.MutableRefObject<boolean>;
    modal: boolean;
    snapPointsOffset: number[];
    activeSnapPointIndex: number;
    direction: "top" | "bottom" | "left" | "right";
    noBodyStyles: boolean;
    container: HTMLElement;
    autoFocus: boolean;
    setHasBeenOpened: React__default.Dispatch<React__default.SetStateAction<boolean>>;
    setIsOpen: (value: boolean | ((prev: boolean) => boolean), details?: DrawerChangeDetails) => void;
    closeOnInteractOutside: boolean;
    closeOnEscape: boolean;
    hasAnimationDone: boolean;
    closeButtonRef: (node: HTMLButtonElement | null) => void;
    isCloseButtonRendered: boolean;
};

interface DrawerRootProps extends UseDrawerProps {
    children?: React$1.ReactNode;
}
declare const DrawerRoot: (props: DrawerRootProps) => react_jsx_runtime.JSX.Element;
interface DrawerTriggerProps extends DialogPrimitive.DialogTriggerProps {
}
declare const DrawerTrigger: React$1.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
interface DrawerPositionerProps extends PrimitiveProps, React$1.HTMLAttributes<HTMLDivElement> {
}
declare const DrawerPositioner: React$1.ForwardRefExoticComponent<DrawerPositionerProps & React$1.RefAttributes<HTMLDivElement>>;
interface DrawerBackdropProps extends DialogPrimitive.DialogOverlayProps, React$1.HTMLAttributes<HTMLDivElement> {
}
declare const DrawerBackdrop: React$1.ForwardRefExoticComponent<DrawerBackdropProps & React$1.RefAttributes<HTMLDivElement>>;
interface DrawerContentProps extends DialogPrimitive.DialogContentProps, React$1.HTMLAttributes<HTMLDivElement> {
}
declare const DrawerContent: React$1.ForwardRefExoticComponent<DrawerContentProps & React$1.RefAttributes<HTMLDivElement>>;
interface DrawerTitleProps extends DialogPrimitive.DialogTitleProps {
}
declare const DrawerTitle: React$1.ForwardRefExoticComponent<DialogPrimitive.DialogTitleProps & React$1.RefAttributes<HTMLHeadingElement>>;
interface DrawerDescriptionProps extends DialogPrimitive.DialogDescriptionProps {
}
declare const DrawerDescription: React$1.ForwardRefExoticComponent<DialogPrimitive.DialogDescriptionProps & React$1.RefAttributes<HTMLParagraphElement>>;
interface DrawerHeaderProps extends PrimitiveProps, React$1.HTMLAttributes<HTMLDivElement> {
}
declare const DrawerHeader: React$1.ForwardRefExoticComponent<DrawerHeaderProps & React$1.RefAttributes<HTMLDivElement>>;
interface DrawerCloseButtonProps extends DialogPrimitive.DialogCloseProps {
}
declare const DrawerCloseButton: React$1.ForwardRefExoticComponent<DrawerCloseButtonProps & React$1.RefAttributes<HTMLButtonElement>>;
interface DrawerHandleProps extends React$1.HTMLAttributes<HTMLDivElement> {
    preventCycle?: boolean;
}
declare const DrawerHandle: React$1.ForwardRefExoticComponent<DrawerHandleProps & React$1.RefAttributes<HTMLDivElement>>;

type DrawerContextValue = ReturnType<typeof useDrawer>;
declare function useDrawerContext(): {
    activeSnapPoint: string | number;
    snapPoints: (string | number)[];
    setActiveSnapPoint: (value: string | number | ((prev: string | number) => string | number), details?: undefined) => void;
    drawerRef: React$1.MutableRefObject<HTMLDivElement>;
    overlayRef: React$1.MutableRefObject<HTMLDivElement>;
    shouldOverlayAnimate: boolean;
    onOpenChange: (open: boolean, details?: ({
        reason?: "closeButton";
    } & {
        event: MouseEvent;
    }) | ({
        reason?: "escapeKeyDown";
    } & {
        event: KeyboardEvent;
    }) | ({
        reason?: "interactOutside";
    } & {
        event: PointerEvent | FocusEvent;
    }) | ({
        reason?: "drag";
    } & {
        event: PointerEvent;
    }) | ({
        reason?: "handleClickOnLastSnapPoint";
    } & {
        event: MouseEvent;
    })) => void;
    onPress: (event: React.PointerEvent<HTMLDivElement>) => void;
    onRelease: (event: React.PointerEvent<HTMLDivElement> | null) => void;
    onDrag: (event: React.PointerEvent<HTMLDivElement>) => void;
    dismissible: boolean;
    handleOnly: boolean;
    isOpen: boolean;
    isDragging: boolean;
    shouldFade: boolean;
    closeDrawer: (fromWithin?: boolean, details?: ({
        reason?: "closeButton";
    } & {
        event: MouseEvent;
    }) | ({
        reason?: "escapeKeyDown";
    } & {
        event: KeyboardEvent;
    }) | ({
        reason?: "interactOutside";
    } & {
        event: PointerEvent | FocusEvent;
    }) | ({
        reason?: "drag";
    } & {
        event: PointerEvent;
    }) | ({
        reason?: "handleClickOnLastSnapPoint";
    } & {
        event: MouseEvent;
    })) => void;
    keyboardIsOpen: React$1.MutableRefObject<boolean>;
    modal: boolean;
    snapPointsOffset: number[];
    activeSnapPointIndex: number;
    direction: "top" | "bottom" | "left" | "right";
    noBodyStyles: boolean;
    container: HTMLElement;
    autoFocus: boolean;
    setHasBeenOpened: React$1.Dispatch<React$1.SetStateAction<boolean>>;
    setIsOpen: (value: boolean | ((prev: boolean) => boolean), details?: ({
        reason?: "closeButton";
    } & {
        event: MouseEvent;
    }) | ({
        reason?: "escapeKeyDown";
    } & {
        event: KeyboardEvent;
    }) | ({
        reason?: "interactOutside";
    } & {
        event: PointerEvent | FocusEvent;
    }) | ({
        reason?: "drag";
    } & {
        event: PointerEvent;
    }) | ({
        reason?: "handleClickOnLastSnapPoint";
    } & {
        event: MouseEvent;
    })) => void;
    closeOnInteractOutside: boolean;
    closeOnEscape: boolean;
    hasAnimationDone: boolean;
    closeButtonRef: (node: HTMLButtonElement | null) => void;
    isCloseButtonRendered: boolean;
};

declare namespace Drawer_namespace {
  export { DrawerBackdrop as Backdrop, DrawerCloseButton as CloseButton, DrawerContent as Content, DrawerDescription as Description, DrawerHandle as Handle, DrawerHeader as Header, DrawerPositioner as Positioner, DrawerRoot as Root, DrawerTitle as Title, DrawerTrigger as Trigger };
  export type { DrawerBackdropProps as BackdropProps, DrawerCloseButtonProps as CloseButtonProps, DrawerContentProps as ContentProps, DrawerDescriptionProps as DescriptionProps, DrawerHandleProps as HandleProps, DrawerHeaderProps as HeaderProps, DrawerPositionerProps as PositionerProps, DrawerRootProps as RootProps, DrawerTitleProps as TitleProps, DrawerTriggerProps as TriggerProps };
}

export { Drawer_namespace as Drawer, DrawerBackdrop, DrawerCloseButton, DrawerContent, DrawerDescription, DrawerHandle, DrawerHeader, DrawerPositioner, DrawerRoot, DrawerTitle, DrawerTrigger, useDrawer, useDrawerContext };
export type { DrawerBackdropProps, DrawerCloseButtonProps, DrawerContentProps, DrawerContextValue, DrawerDescriptionProps, DrawerHandleProps, DrawerHeaderProps, DrawerPositionerProps, DrawerRootProps, DrawerTitleProps, DrawerTriggerProps, UseDrawerProps };
