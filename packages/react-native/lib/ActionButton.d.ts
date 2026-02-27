import React from "react";
import { View, type ViewProps } from "react-native";
export interface ActionButtonProps extends ViewProps {
    variant?: "primary" | "secondary" | "tertiary" | "ghost";
    size?: "s" | "m" | "l";
    loading?: boolean;
    disabled?: boolean;
    onPress?: () => void;
    children?: React.ReactNode;
}
export declare const ActionButton: React.ForwardRefExoticComponent<ActionButtonProps & React.RefAttributes<View>>;
//# sourceMappingURL=ActionButton.d.ts.map