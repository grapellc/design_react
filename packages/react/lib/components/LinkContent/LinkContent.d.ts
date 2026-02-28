import { LinkContentVariantProps } from '@grape-design/css/recipes/link-content';
import { PrimitiveProps } from '@grape-design/react-primitive';
import { StyleProps } from '../../utils/styled';
import type * as React from "react";
/**
 * @deprecated Use `ActionButton` with variant="ghost" instead.
 */
export interface LinkContentProps extends LinkContentVariantProps, PrimitiveProps, Pick<StyleProps, "color">, Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
}
/**
 * @deprecated Use `ActionButton` with variant="ghost" instead.
 */
export declare const LinkContent: React.ForwardRefExoticComponent<LinkContentProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=LinkContent.d.ts.map