import { PrimitiveProps } from '@grape-design/react-primitive';
import { TagGroupVariantProps } from '@grape-design/css/recipes/tag-group';
import { TagGroupItemVariantProps } from '@grape-design/css/recipes/tag-group-item';
import { StyleProps } from '../../utils/styled';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
export interface TagGroupRootProps extends TagGroupVariantProps, TagGroupItemVariantProps, PrimitiveProps, React.HTMLAttributes<HTMLSpanElement> {
    separator?: React.ReactNode;
}
export declare const TagGroupRoot: ForwardRefExoticComponent<TagGroupRootProps & RefAttributes<HTMLSpanElement>>;
export interface TagGroupItemProps extends TagGroupItemVariantProps, Pick<StyleProps, "flexShrink">, PrimitiveProps, React.HTMLAttributes<HTMLSpanElement> {
}
export declare const TagGroupItem: ForwardRefExoticComponent<TagGroupItemProps & RefAttributes<HTMLSpanElement>>;
export interface TagGroupItemLabelProps extends PrimitiveProps, React.HTMLAttributes<HTMLSpanElement> {
}
export declare const TagGroupItemLabel: ForwardRefExoticComponent<TagGroupItemLabelProps & RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=TagGroup.d.ts.map