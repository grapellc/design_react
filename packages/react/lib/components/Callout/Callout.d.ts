import { PrimitiveProps } from '@seed-design/react-primitive';
import { CalloutVariantProps } from '@seed-design/css/recipes/callout';
import { DismissibleRootProps } from '../private/useDismissible';
import type * as React from "react";
export interface CalloutRootProps extends CalloutVariantProps, DismissibleRootProps {
}
export declare const CalloutRoot: React.ForwardRefExoticComponent<CalloutRootProps & React.RefAttributes<HTMLDivElement>>;
export interface CalloutContentProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const CalloutContent: React.ForwardRefExoticComponent<CalloutContentProps & React.RefAttributes<HTMLDivElement>>;
export interface CalloutTitleProps extends PrimitiveProps, React.HTMLAttributes<HTMLSpanElement> {
}
export declare const CalloutTitle: React.ForwardRefExoticComponent<CalloutTitleProps & React.RefAttributes<HTMLSpanElement>>;
export interface CalloutDescriptionProps extends PrimitiveProps, React.HTMLAttributes<HTMLSpanElement> {
}
export declare const CalloutDescription: React.ForwardRefExoticComponent<CalloutDescriptionProps & React.RefAttributes<HTMLSpanElement>>;
export interface CalloutLinkProps extends PrimitiveProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
}
export declare const CalloutLink: React.ForwardRefExoticComponent<CalloutLinkProps & React.RefAttributes<HTMLButtonElement>>;
export interface CalloutCloseButtonProps extends PrimitiveProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
}
export declare const CalloutCloseButton: React.ForwardRefExoticComponent<CalloutCloseButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=Callout.d.ts.map