"use client";

import { IconBellFill } from "@karrotmarket/react-monochrome-icon";
import { Box, Float, PrefixIcon } from "@grape-design/react";
import { ContextualFloatingButton } from "grape-design/ui/contextual-floating-button";

export default function ContextualFloatingButtonFloatComposition() {
  return (
    <Box
      position="relative"
      width="300px"
      height="500px"
      borderWidth={1}
      borderColor="stroke.neutralMuted"
    >
      <Float placement="bottom-center" offsetY="x4">
        <ContextualFloatingButton>
          <PrefixIcon svg={<IconBellFill />} />
          Notice 설정
        </ContextualFloatingButton>
      </Float>
    </Box>
  );
}
