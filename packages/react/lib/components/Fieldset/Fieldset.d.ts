import { PrimitiveProps } from '@grape-design/react-primitive';
import { FieldVariantProps } from '@grape-design/css/recipes/field';
import { FieldLabelVariantProps } from '@grape-design/css/recipes/field-label';
import { Fieldset } from '@grape-design/react-fieldset';
import type * as React from "react";
export interface FieldsetRootProps extends FieldVariantProps, Fieldset.RootProps {
}
export declare const FieldsetRoot: React.ForwardRefExoticComponent<FieldsetRootProps & React.RefAttributes<HTMLDivElement>>;
export interface FieldsetHeaderProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const FieldsetHeader: React.ForwardRefExoticComponent<FieldsetHeaderProps & React.RefAttributes<HTMLDivElement>>;
export interface FieldsetLabelProps extends FieldLabelVariantProps, Fieldset.LabelProps {
}
export declare const FieldsetLabel: React.ForwardRefExoticComponent<FieldsetLabelProps & React.RefAttributes<HTMLDivElement>>;
export interface FieldsetIndicatorTextProps extends PrimitiveProps, React.HTMLAttributes<HTMLSpanElement> {
}
export declare const FieldsetIndicatorText: React.ForwardRefExoticComponent<FieldsetIndicatorTextProps & React.RefAttributes<HTMLSpanElement>>;
export interface FieldsetRequiredIndicatorProps extends React.SVGProps<SVGElement> {
}
export declare const FieldsetRequiredIndicator: React.ForwardRefExoticComponent<Omit<FieldsetRequiredIndicatorProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
export interface FieldsetFooterProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const FieldsetFooter: React.ForwardRefExoticComponent<FieldsetFooterProps & React.RefAttributes<HTMLDivElement>>;
export interface FieldsetDescriptionProps extends Fieldset.DescriptionProps {
}
export declare const FieldsetDescription: React.ForwardRefExoticComponent<FieldsetDescriptionProps & React.RefAttributes<HTMLSpanElement>>;
export interface FieldsetErrorMessageProps extends Fieldset.ErrorMessageProps {
}
export declare const FieldsetErrorMessage: React.ForwardRefExoticComponent<FieldsetErrorMessageProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Fieldset.d.ts.map