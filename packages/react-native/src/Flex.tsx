import React from "react";
import { View } from "react-native";
import { Box, type BoxProps } from "./Box";

export type FlexProps = BoxProps;

export const Flex = React.forwardRef<View, FlexProps>((props, ref) => (
  <Box ref={ref} flexDirection="row" alignItems="center" {...props} />
));
Flex.displayName = "Flex";
