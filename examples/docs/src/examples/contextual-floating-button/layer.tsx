"use client";

import { IconPlusLine } from "@karrotmarket/react-monochrome-icon";
import { PrefixIcon } from "@grapu-design/react";
import { ContextualFloatingButton } from "grapu-design/ui/contextual-floating-button";

export default function ContextualFloatingButtonLayer() {
  return (
    <ContextualFloatingButton variant="layer">
      <PrefixIcon svg={<IconPlusLine />} />
      Layer Variant
    </ContextualFloatingButton>
  );
}
