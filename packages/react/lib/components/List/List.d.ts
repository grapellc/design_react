import { ListItemVariantProps } from '@grape-design/css/recipes/list-item';
import { PrimitiveProps } from '@seed-design/react-primitive';
import { StyleProps } from '../../utils/styled';
import { VStackProps } from '../Stack';
import type * as React from "react";
export interface ListRootProps extends VStackProps {
    itemBorderRadius?: StyleProps["borderRadius"];
}
export declare const ListRoot: React.ForwardRefExoticComponent<ListRootProps & React.RefAttributes<HTMLUListElement>>;
export interface ListItemProps extends PrimitiveProps, Pick<StyleProps, "alignItems">, React.HTMLAttributes<HTMLLIElement>, ListItemVariantProps {
}
export declare const ListItem: React.ForwardRefExoticComponent<ListItemProps & React.RefAttributes<HTMLLIElement>>;
export interface ListContentProps extends PrimitiveProps, Pick<StyleProps, "gap" | "pr" | "paddingRight">, React.HTMLAttributes<HTMLDivElement> {
}
export declare const ListContent: React.ForwardRefExoticComponent<ListContentProps & React.RefAttributes<HTMLDivElement>>;
export interface ListPrefixProps extends PrimitiveProps, Pick<StyleProps, "pr" | "paddingRight">, React.HTMLAttributes<HTMLDivElement> {
}
export declare const ListPrefix: React.ForwardRefExoticComponent<ListPrefixProps & React.RefAttributes<HTMLDivElement>>;
export interface ListSuffixProps extends PrimitiveProps, Pick<StyleProps, "gap" | "position">, React.HTMLAttributes<HTMLDivElement> {
}
export declare const ListSuffix: React.ForwardRefExoticComponent<ListSuffixProps & React.RefAttributes<HTMLDivElement>>;
export interface ListTitleProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const ListTitle: React.ForwardRefExoticComponent<ListTitleProps & React.RefAttributes<HTMLDivElement>>;
export interface ListDetailProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const ListDetail: React.ForwardRefExoticComponent<ListDetailProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=List.d.ts.map