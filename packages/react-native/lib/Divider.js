import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from "./Box";
import { colors } from "@grape-design/tokens/native";
export const Divider = ({ orientation = "horizontal", thickness = 1, color = colors.stroke.default, }) => (_jsx(Box, { width: orientation === "horizontal" ? "100%" : thickness, height: orientation === "vertical" ? "100%" : thickness, bg: color }));
