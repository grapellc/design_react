"use client";

import { IconBellFill } from "@karrotmarket/react-monochrome-icon";
import { PrefixIcon } from "@grape-design/react";
import { ContextualFloatingButton } from "grape-design/ui/contextual-floating-button";

export default function ContextualFloatingButtonPreview() {
  return (
    <ContextualFloatingButton>
      <PrefixIcon svg={<IconBellFill />} />
      Notice 설정
    </ContextualFloatingButton>
  );
}
