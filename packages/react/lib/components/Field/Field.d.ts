import { PrimitiveProps } from '@grape-design/react-primitive';
import { Field } from '@grape-design/react-field';
import { FieldVariantProps } from '@grape-design/css/recipes/field';
import { FieldLabelVariantProps } from '@grape-design/css/recipes/field-label';
import type * as React from "react";
export interface FieldRootProps extends FieldVariantProps, Field.RootProps {
}
export declare const FieldRoot: React.ForwardRefExoticComponent<FieldRootProps & React.RefAttributes<HTMLDivElement>>;
export interface FieldHeaderProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const FieldHeader: React.ForwardRefExoticComponent<FieldHeaderProps & React.RefAttributes<HTMLDivElement>>;
export interface FieldLabelProps extends FieldLabelVariantProps, Field.LabelProps {
}
export declare const FieldLabel: React.ForwardRefExoticComponent<FieldLabelProps & React.RefAttributes<HTMLLabelElement>>;
export interface FieldIndicatorTextProps extends PrimitiveProps, React.HTMLAttributes<HTMLSpanElement> {
}
export declare const FieldIndicatorText: React.ForwardRefExoticComponent<FieldIndicatorTextProps & React.RefAttributes<HTMLSpanElement>>;
export interface FieldRequiredIndicatorProps extends React.SVGProps<SVGElement> {
}
export declare const FieldRequiredIndicator: React.ForwardRefExoticComponent<Omit<FieldRequiredIndicatorProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
export interface FieldFooterProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const FieldFooter: React.ForwardRefExoticComponent<FieldFooterProps & React.RefAttributes<HTMLDivElement>>;
export interface FieldDescriptionProps extends Field.DescriptionProps {
}
export declare const FieldDescription: React.ForwardRefExoticComponent<FieldDescriptionProps & React.RefAttributes<HTMLSpanElement>>;
export interface FieldErrorMessageProps extends Field.ErrorMessageProps {
}
export declare const FieldErrorMessage: React.ForwardRefExoticComponent<FieldErrorMessageProps & React.RefAttributes<HTMLSpanElement>>;
export interface FieldCharacterCountProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
    /**
     * The current number of characters/graphemes
     */
    current: number;
    /**
     * The maximum allowed characters/graphemes
     */
    max: number;
}
export declare const FieldCharacterCount: React.ForwardRefExoticComponent<FieldCharacterCountProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Field.d.ts.map