import { Image } from '@seed-design/react-image';
import { PrimitiveProps } from '@seed-design/react-primitive';
import { AvatarVariantProps } from '@seed-design/css/recipes/avatar';
import { AvatarStackVariantProps } from '@seed-design/css/recipes/avatar-stack';
import * as React from "react";
export interface AvatarRootProps extends AvatarVariantProps, Image.RootProps {
}
export declare const AvatarRoot: React.ForwardRefExoticComponent<AvatarRootProps & React.RefAttributes<HTMLDivElement>>;
export interface AvatarImageProps extends Image.ContentProps {
}
export declare const AvatarImage: React.ForwardRefExoticComponent<AvatarImageProps & React.RefAttributes<HTMLImageElement>>;
export interface AvatarFallbackProps extends Image.FallbackProps {
}
export declare const AvatarFallback: React.ForwardRefExoticComponent<AvatarFallbackProps & React.RefAttributes<HTMLDivElement>>;
export interface AvatarBadgeProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const AvatarBadge: React.ForwardRefExoticComponent<AvatarBadgeProps & React.RefAttributes<HTMLDivElement>>;
export interface AvatarStackProps extends AvatarStackVariantProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const AvatarStack: React.ForwardRefExoticComponent<AvatarStackProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Avatar.d.ts.map