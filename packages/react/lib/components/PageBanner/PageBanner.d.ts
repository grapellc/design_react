import { PageBannerVariantProps } from '@grape-design/css/recipes/page-banner';
import { PrimitiveProps } from '@grape-design/react-primitive';
import { DismissibleRootProps } from '../private/useDismissible';
import type * as React from "react";
export interface PageBannerRootProps extends PageBannerVariantProps, DismissibleRootProps {
}
export declare const PageBannerRoot: React.ForwardRefExoticComponent<PageBannerRootProps & React.RefAttributes<HTMLDivElement>>;
export interface PageBannerContentProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const PageBannerContent: React.ForwardRefExoticComponent<PageBannerContentProps & React.RefAttributes<HTMLDivElement>>;
export interface PageBannerBodyProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const PageBannerBody: React.ForwardRefExoticComponent<PageBannerBodyProps & React.RefAttributes<HTMLDivElement>>;
export interface PageBannerTitleProps extends PrimitiveProps, React.HTMLAttributes<HTMLSpanElement> {
}
export declare const PageBannerTitle: React.ForwardRefExoticComponent<PageBannerTitleProps & React.RefAttributes<HTMLSpanElement>>;
export interface PageBannerDescriptionProps extends PrimitiveProps, React.HTMLAttributes<HTMLSpanElement> {
}
export declare const PageBannerDescription: React.ForwardRefExoticComponent<PageBannerDescriptionProps & React.RefAttributes<HTMLSpanElement>>;
export interface PageBannerButtonProps extends PrimitiveProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
}
export declare const PageBannerButton: React.ForwardRefExoticComponent<PageBannerButtonProps & React.RefAttributes<HTMLButtonElement>>;
export interface PageBannerCloseButtonProps extends PrimitiveProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
}
export declare const PageBannerCloseButton: React.ForwardRefExoticComponent<PageBannerCloseButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=PageBanner.d.ts.map