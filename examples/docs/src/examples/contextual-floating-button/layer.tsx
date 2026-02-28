"use client";

import { IconPlusLine } from "@karrotmarket/react-monochrome-icon";
import { PrefixIcon } from "@grape-design/react";
import { ContextualFloatingButton } from "grape-design/ui/contextual-floating-button";

export default function ContextualFloatingButtonLayer() {
  return (
    <ContextualFloatingButton variant="layer">
      <PrefixIcon svg={<IconPlusLine />} />
      Layer Variant
    </ContextualFloatingButton>
  );
}
