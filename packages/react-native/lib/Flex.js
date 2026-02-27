import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Box } from "./Box";
export const Flex = React.forwardRef((props, ref) => (_jsx(Box, { ref: ref, flexDirection: "row", alignItems: "center", ...props })));
Flex.displayName = "Flex";
