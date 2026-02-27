export interface UseTextFieldWithGraphemesParams {
    maxGraphemeCount?: number;
    value?: string;
    defaultValue?: string;
    onValueChange?: (values: {
        value: string;
        graphemes: string[];
        slicedValue: string;
        slicedGraphemes: string[];
    }) => void;
}
export declare function useTextFieldWithGraphemes({ maxGraphemeCount, value: controlledValue, defaultValue, onValueChange, }: UseTextFieldWithGraphemesParams): {
    textFieldRootProps: {
        value: string;
        onValueChange: (newValue: string) => void;
    };
    counterProps: {
        current: number;
        max: number;
    };
    graphemes: string[];
};
//# sourceMappingURL=useTextFieldWithGraphemes.d.ts.map