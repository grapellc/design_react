import { FieldVariantProps } from '@seed-design/css/recipes/field';
import { FieldLabelVariantProps } from '@seed-design/css/recipes/field-label';
import { PrimitiveProps } from '@seed-design/react-primitive';
import { RadioGroup as RadioGroupPrimitive } from '@seed-design/react-radio-group';
import type * as React from "react";
export interface RadioGroupFieldRootProps extends FieldVariantProps, RadioGroupPrimitive.RootProps {
}
export declare const RadioGroupFieldRoot: React.ForwardRefExoticComponent<RadioGroupFieldRootProps & React.RefAttributes<HTMLDivElement>>;
export interface RadioGroupFieldHeaderProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const RadioGroupFieldHeader: React.ForwardRefExoticComponent<RadioGroupFieldHeaderProps & React.RefAttributes<HTMLDivElement>>;
export interface RadioGroupFieldLabelProps extends FieldLabelVariantProps, RadioGroupPrimitive.LabelProps {
}
export declare const RadioGroupFieldLabel: React.ForwardRefExoticComponent<RadioGroupFieldLabelProps & React.RefAttributes<HTMLDivElement>>;
export interface RadioGroupFieldIndicatorTextProps extends PrimitiveProps, React.HTMLAttributes<HTMLSpanElement> {
}
export declare const RadioGroupFieldIndicatorText: React.ForwardRefExoticComponent<RadioGroupFieldIndicatorTextProps & React.RefAttributes<HTMLSpanElement>>;
export interface RadioGroupFieldRequiredIndicatorProps extends React.SVGProps<SVGElement> {
}
export declare const RadioGroupFieldRequiredIndicator: React.ForwardRefExoticComponent<Omit<RadioGroupFieldRequiredIndicatorProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
export interface RadioGroupFieldFooterProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const RadioGroupFieldFooter: React.ForwardRefExoticComponent<RadioGroupFieldFooterProps & React.RefAttributes<HTMLDivElement>>;
export interface RadioGroupFieldDescriptionProps extends RadioGroupPrimitive.DescriptionProps {
}
export declare const RadioGroupFieldDescription: React.ForwardRefExoticComponent<RadioGroupFieldDescriptionProps & React.RefAttributes<HTMLSpanElement>>;
export interface RadioGroupFieldErrorMessageProps extends RadioGroupPrimitive.ErrorMessageProps {
}
export declare const RadioGroupFieldErrorMessage: React.ForwardRefExoticComponent<RadioGroupFieldErrorMessageProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RadioGroupField.d.ts.map