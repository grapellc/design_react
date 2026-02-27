import { IdentityPlaceholderVariantProps } from '@grape-design/css/recipes/identity-placeholder';
import { PrimitiveProps } from '@seed-design/react-primitive';
import * as React from "react";
export interface IdentityPlaceholderRootProps extends IdentityPlaceholderVariantProps, PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const IdentityPlaceholderRoot: React.ForwardRefExoticComponent<IdentityPlaceholderRootProps & React.RefAttributes<HTMLDivElement>>;
export interface IdentityPlaceholderImageProps extends React.SVGProps<SVGSVGElement> {
}
export declare const IdentityPlaceholderImage: React.ForwardRefExoticComponent<Omit<IdentityPlaceholderImageProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
//# sourceMappingURL=IdentityPlaceholder.d.ts.map