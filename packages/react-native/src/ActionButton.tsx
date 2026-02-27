import React from "react";
import { TouchableOpacity, View, type ViewProps } from "react-native";
import { spacing, radius, colors } from "@grape-design/tokens/native";
import { Text } from "./Text";

export interface ActionButtonProps extends ViewProps {
  variant?: "primary" | "secondary" | "tertiary" | "ghost";
  size?: "s" | "m" | "l";
  loading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
}

const SIZE_STYLES = {
  s: { paddingVertical: spacing.x1_5, paddingHorizontal: spacing.x3, minHeight: 32 },
  m: { paddingVertical: spacing.x2, paddingHorizontal: spacing.x4, minHeight: 40 },
  l: { paddingVertical: spacing.x2_5, paddingHorizontal: spacing.x5, minHeight: 48 },
};

export const ActionButton = React.forwardRef<React.ComponentRef<typeof TouchableOpacity>, ActionButtonProps>(
  (
    {
      variant = "primary",
      size = "m",
      loading = false,
      disabled = false,
      onPress,
      children,
      style,
      ...rest
    },
    ref
  ) => {
    const sizeStyle = SIZE_STYLES[size];
    const isDisabled = disabled || loading;

    const variantStyles: Record<NonNullable<ActionButtonProps["variant"]>, object> = {
      primary: {
        backgroundColor: colors.bg.brandSolid,
        borderRadius: radius.x2,
      },
      secondary: {
        backgroundColor: colors.bg.neutralWeak,
        borderRadius: radius.x2,
      },
      tertiary: {
        backgroundColor: "transparent",
        borderRadius: radius.x2,
      },
      ghost: {
        backgroundColor: "transparent",
        borderRadius: radius.x2,
      },
    };

    const textColor =
      variant === "primary" || variant === "secondary"
        ? variant === "primary"
          ? colors.palette.staticWhite
          : colors.fg.neutral
        : colors.fg.brand;

    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.7}
        style={[
          variantStyles[variant],
          sizeStyle,
          isDisabled && { opacity: 0.5 },
          style,
        ]}
        {...rest}
      >
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: spacing.x2 }}>
          {loading ? (
            <Text color={textColor} fontSize="x2">
              ...
            </Text>
          ) : (
            <Text
              color={textColor}
              fontSize={size === "s" ? "x1" : size === "m" ? "x2" : "x3"}
              fontWeight="bold"
            >
              {children}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  }
);
ActionButton.displayName = "ActionButton";
