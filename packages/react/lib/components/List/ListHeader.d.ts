import { ListHeaderVariantProps } from '@grape-design/css/recipes/list-header';
import { PrimitiveProps } from '@grape-design/react-primitive';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
export interface ListHeaderProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement>, ListHeaderVariantProps {
    /**
     * @default "div"
     */
    as?: "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}
export declare const ListHeader: ForwardRefExoticComponent<ListHeaderProps & RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ListHeader.d.ts.map