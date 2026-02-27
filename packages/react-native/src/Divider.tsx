import React from "react";
import { Box } from "./Box";
import { colors } from "@grape-design/tokens/native";

export interface DividerProps {
  orientation?: "horizontal" | "vertical";
  thickness?: number;
  color?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = "horizontal",
  thickness = 1,
  color = colors.stroke.default,
}) => (
  <Box
    width={orientation === "horizontal" ? "100%" : thickness}
    height={orientation === "vertical" ? "100%" : thickness}
    bg={color}
  />
);
