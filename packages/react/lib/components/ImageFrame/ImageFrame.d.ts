import { ImageFrameVariantProps } from '@seed-design/css/recipes/image-frame';
import { ImageFrameIconVariantProps } from '@seed-design/css/recipes/image-frame-icon';
import { ImageFrameIndicatorVariantProps } from '@seed-design/css/recipes/image-frame-indicator';
import { Toggle as TogglePrimitive } from '@seed-design/react-toggle';
import { AspectRatioProps } from '../AspectRatio/AspectRatio';
import { BadgeProps } from '../Badge/Badge';
import { FloatProps } from '../Float/Float';
import * as React from "react";
export interface ImageFrameProps extends Omit<AspectRatioProps, "children">, ImageFrameVariantProps {
    /**
     * @deprecated Deprecated in @seed-design/react@1.2.x; will be removed in 1.3.0.
     * Use borderRadius="r2" instead.
     * Reason: 모서리 스타일은 borderRadius prop으로 통일합니다.
     */
    rounded?: ImageFrameVariantProps["rounded"];
    src: string;
    alt: string;
    fallback?: React.ReactNode;
    loading?: "eager" | "lazy";
    decoding?: "async" | "auto" | "sync";
    crossOrigin?: "anonymous" | "use-credentials" | "";
    referrerPolicy?: React.HTMLAttributeReferrerPolicy;
    sizes?: string;
    srcSet?: string;
    onLoad?: React.ReactEventHandler<HTMLImageElement>;
    onError?: React.ReactEventHandler<HTMLImageElement>;
    /**
     * Overlay elements to be rendered on top of the image.
     * Use ImageFrameFloater to position them.
     */
    children?: React.ReactNode;
}
export declare const ImageFrame: React.ForwardRefExoticComponent<ImageFrameProps & React.RefAttributes<HTMLDivElement>>;
export interface ImageFrameFloaterProps extends FloatProps {
}
/**
 * ImageFrame 내에서 오버레이 요소를 배치하기 위한 컴포넌트
 *
 * @remarks
 * offsetX, offsetY 기본값은 rootage 스펙(image-frame-floater)에서 가져옵니다.
 */
export declare const ImageFrameFloater: React.ForwardRefExoticComponent<ImageFrameFloaterProps & React.RefAttributes<HTMLDivElement>>;
export interface ImageFrameBadgeProps extends BadgeProps {
}
export declare const ImageFrameBadge: React.ForwardRefExoticComponent<ImageFrameBadgeProps & React.RefAttributes<HTMLSpanElement>>;
export interface ImageFrameIconProps extends ImageFrameIconVariantProps, Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
    svg: React.ReactNode;
}
export declare const ImageFrameIcon: React.ForwardRefExoticComponent<ImageFrameIconProps & React.RefAttributes<HTMLSpanElement>>;
export interface ImageFrameIndicatorProps extends ImageFrameIndicatorVariantProps, React.HTMLAttributes<HTMLSpanElement> {
    children: React.ReactNode;
}
export declare const ImageFrameIndicator: React.ForwardRefExoticComponent<ImageFrameIndicatorProps & React.RefAttributes<HTMLSpanElement>>;
export interface ImageFrameReactionButtonProps extends Omit<TogglePrimitive.RootProps, "children"> {
}
export declare const ImageFrameReactionButton: React.ForwardRefExoticComponent<ImageFrameReactionButtonProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=ImageFrame.d.ts.map