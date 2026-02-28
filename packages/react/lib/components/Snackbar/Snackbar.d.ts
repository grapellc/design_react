import { SnackbarVariantProps } from '@grape-design/css/recipes/snackbar';
import { PrimitiveProps } from '@grape-design/react-primitive';
import { Snackbar as SnackbarPrimitive } from '@grape-design/react-snackbar';
import { InternalIconProps } from '../private/Icon';
import { ForwardRefExoticComponent, RefAttributes, ReactNode, ReactElement, JSXElementConstructor } from 'react';
export interface SnackbarRootProviderProps extends SnackbarPrimitive.RootProviderProps {
}
export declare const SnackbarRootProvider: ({ children, pauseOnInteraction, }: SnackbarPrimitive.RootProviderProps) => import("react/jsx-runtime").JSX.Element;
export interface SnackbarRegionProps extends SnackbarVariantProps, SnackbarPrimitive.RegionProps {
}
export declare const SnackbarRegion: ForwardRefExoticComponent<SnackbarRegionProps & RefAttributes<HTMLDivElement>>;
export interface SnackbarRootProps extends SnackbarVariantProps, SnackbarPrimitive.RootProps {
}
export declare const SnackbarRoot: ForwardRefExoticComponent<SnackbarRootProps & RefAttributes<HTMLDivElement>>;
export interface SnackbarContentProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const SnackbarContent: ForwardRefExoticComponent<SnackbarContentProps & RefAttributes<HTMLDivElement>>;
export interface SnackbarMessageProps extends PrimitiveProps, React.HTMLAttributes<HTMLSpanElement> {
}
export declare const SnackbarMessage: ForwardRefExoticComponent<SnackbarMessageProps & RefAttributes<HTMLSpanElement>>;
export interface SnackbarPrefixIconProps extends InternalIconProps {
}
export declare const SnackbarPrefixIcon: ForwardRefExoticComponent<SnackbarPrefixIconProps & RefAttributes<HTMLDivElement>>;
export interface SnackbarActionButtonProps extends PrimitiveProps, React.HTMLAttributes<HTMLButtonElement> {
}
export declare const SnackbarActionButton: ForwardRefExoticComponent<SnackbarActionButtonProps & RefAttributes<HTMLButtonElement>>;
export interface SnackbarHiddenCloseButtonProps extends SnackbarPrimitive.CloseButtonProps {
}
/**
 * Visually hidden button that closes the snackbar (for screen readers).
 */
export declare const SnackbarHiddenCloseButton: ForwardRefExoticComponent<SnackbarHiddenCloseButtonProps & RefAttributes<HTMLButtonElement>>;
export interface SnackbarRendererProps extends SnackbarPrimitive.RendererProps {
}
export declare const SnackbarRenderer: (_props: SnackbarPrimitive.RendererProps) => ReactNode;
export interface SnackbarAvoidOverlapProps extends SnackbarPrimitive.AvoidOverlapProps {
}
export declare const SnackbarAvoidOverlap: (props: SnackbarPrimitive.AvoidOverlapProps) => ReactElement<any, string | JSXElementConstructor<any>>;
//# sourceMappingURL=Snackbar.d.ts.map