"use client";

import { IconBellFill } from "@karrotmarket/react-monochrome-icon";
import { PrefixIcon } from "@grapu-design/react";
import { ContextualFloatingButton } from "grapu-design/ui/contextual-floating-button";

export default function ContextualFloatingButtonPreview() {
  return (
    <ContextualFloatingButton>
      <PrefixIcon svg={<IconBellFill />} />
      Notice 설정
    </ContextualFloatingButton>
  );
}
