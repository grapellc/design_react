import { PrimitiveProps } from '@seed-design/react-primitive';
import { TextField } from '@seed-design/react-text-field';
import { TextInputVariantProps } from '@grape-design/css/recipes/text-input';
import { InternalIconProps } from '../private/Icon';
import type * as React from "react";
export interface TextFieldRootProps extends TextInputVariantProps, TextField.RootProps {
}
export declare const TextFieldRoot: React.ForwardRefExoticComponent<TextFieldRootProps & React.RefAttributes<HTMLDivElement>>;
export interface TextFieldPrefixIconProps extends InternalIconProps {
}
export declare const TextFieldPrefixIcon: React.ForwardRefExoticComponent<TextFieldPrefixIconProps & React.RefAttributes<SVGSVGElement>>;
export interface TextFieldPrefixTextProps extends PrimitiveProps, React.HTMLAttributes<HTMLSpanElement> {
}
export declare const TextFieldPrefixText: React.ForwardRefExoticComponent<TextFieldPrefixTextProps & React.RefAttributes<HTMLSpanElement>>;
export interface TextFieldSuffixIconProps extends InternalIconProps {
}
export declare const TextFieldSuffixIcon: React.ForwardRefExoticComponent<TextFieldSuffixIconProps & React.RefAttributes<SVGSVGElement>>;
export interface TextFieldSuffixTextProps extends PrimitiveProps, React.HTMLAttributes<HTMLSpanElement> {
}
export declare const TextFieldSuffixText: React.ForwardRefExoticComponent<TextFieldSuffixTextProps & React.RefAttributes<HTMLSpanElement>>;
export interface TextFieldInputProps extends TextField.InputProps {
}
export declare const TextFieldInput: React.ForwardRefExoticComponent<TextFieldInputProps & React.RefAttributes<HTMLInputElement>>;
export interface TextFieldTextareaProps extends TextField.TextareaProps {
    /**
     * If true, the textarea will automatically resize based on its content.
     * @default true
     */
    autoresize?: boolean;
}
export declare const TextFieldTextarea: React.ForwardRefExoticComponent<TextFieldTextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
//# sourceMappingURL=TextField.d.ts.map