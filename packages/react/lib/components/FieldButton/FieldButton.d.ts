import { PrimitiveProps } from '@seed-design/react-primitive';
import { FieldButton } from '@seed-design/react-field-button';
import { FieldVariantProps } from '@grape-design/css/recipes/field';
import { FieldLabelVariantProps } from '@grape-design/css/recipes/field-label';
import { InternalIconProps } from '../private/Icon';
import * as React from "react";
export interface FieldButtonRootProps extends FieldVariantProps, FieldButton.RootProps {
}
export declare const FieldButtonRoot: React.ForwardRefExoticComponent<FieldButtonRootProps & React.RefAttributes<HTMLDivElement>>;
export interface FieldButtonHeaderProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const FieldButtonHeader: React.ForwardRefExoticComponent<FieldButtonHeaderProps & React.RefAttributes<HTMLDivElement>>;
export interface FieldButtonLabelProps extends PrimitiveProps, FieldLabelVariantProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const FieldButtonLabel: React.ForwardRefExoticComponent<FieldButtonLabelProps & React.RefAttributes<HTMLDivElement>>;
export interface FieldButtonIndicatorTextProps extends PrimitiveProps, React.HTMLAttributes<HTMLSpanElement> {
}
export declare const FieldButtonIndicatorText: React.ForwardRefExoticComponent<FieldButtonIndicatorTextProps & React.RefAttributes<HTMLSpanElement>>;
export interface FieldButtonRequiredIndicatorProps extends React.SVGProps<SVGElement> {
}
export declare const FieldButtonRequiredIndicator: React.ForwardRefExoticComponent<Omit<FieldButtonRequiredIndicatorProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
export interface FieldButtonPrefixIconProps extends InternalIconProps {
}
export declare const FieldButtonPrefixIcon: React.ForwardRefExoticComponent<FieldButtonPrefixIconProps & React.RefAttributes<SVGSVGElement>>;
export interface FieldButtonPrefixTextProps extends PrimitiveProps, React.HTMLAttributes<HTMLSpanElement> {
}
export declare const FieldButtonPrefixText: React.ForwardRefExoticComponent<FieldButtonPrefixTextProps & React.RefAttributes<HTMLSpanElement>>;
export interface FieldButtonSuffixIconProps extends InternalIconProps {
}
export declare const FieldButtonSuffixIcon: React.ForwardRefExoticComponent<FieldButtonSuffixIconProps & React.RefAttributes<SVGSVGElement>>;
export interface FieldButtonSuffixTextProps extends PrimitiveProps, React.HTMLAttributes<HTMLSpanElement> {
}
export declare const FieldButtonSuffixText: React.ForwardRefExoticComponent<FieldButtonSuffixTextProps & React.RefAttributes<HTMLSpanElement>>;
export interface FieldButtonFooterProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const FieldButtonFooter: React.ForwardRefExoticComponent<FieldButtonFooterProps & React.RefAttributes<HTMLDivElement>>;
export interface FieldButtonDescriptionProps extends FieldButton.DescriptionProps {
}
export declare const FieldButtonDescription: React.ForwardRefExoticComponent<FieldButtonDescriptionProps & React.RefAttributes<HTMLSpanElement>>;
export interface FieldButtonErrorMessageProps extends FieldButton.ErrorMessageProps {
}
export declare const FieldButtonErrorMessage: React.ForwardRefExoticComponent<FieldButtonErrorMessageProps & React.RefAttributes<HTMLSpanElement>>;
export interface FieldButtonHiddenInputProps extends FieldButton.HiddenInputProps {
}
export declare const FieldButtonHiddenInput: React.ForwardRefExoticComponent<FieldButton.HiddenInputProps & React.RefAttributes<HTMLInputElement>>;
export interface FieldButtonButtonProps extends FieldButton.ButtonProps {
}
export declare const FieldButtonButton: React.ForwardRefExoticComponent<FieldButtonButtonProps & React.RefAttributes<HTMLButtonElement>>;
export interface FieldButtonControlProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const FieldButtonControl: React.ForwardRefExoticComponent<FieldButtonControlProps & React.RefAttributes<HTMLDivElement>>;
export interface FieldButtonClearButtonProps extends FieldButton.ClearButtonProps {
}
export declare const FieldButtonClearButton: React.ForwardRefExoticComponent<FieldButtonClearButtonProps & React.RefAttributes<HTMLButtonElement>>;
export interface FieldButtonValueProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const FieldButtonValue: React.ForwardRefExoticComponent<FieldButtonValueProps & React.RefAttributes<HTMLDivElement>>;
export interface FieldButtonPlaceholderProps extends PrimitiveProps, React.HTMLAttributes<HTMLDivElement> {
}
export declare const FieldButtonPlaceholder: React.ForwardRefExoticComponent<FieldButtonPlaceholderProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FieldButton.d.ts.map