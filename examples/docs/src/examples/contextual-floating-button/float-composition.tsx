"use client";

import { IconBellFill } from "@karrotmarket/react-monochrome-icon";
import { Box, Float, PrefixIcon } from "@grapu-design/react";
import { ContextualFloatingButton } from "grapu-design/ui/contextual-floating-button";

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
