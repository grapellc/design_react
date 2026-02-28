"use client";

import { IconPlusLine } from "@karrotmarket/react-monochrome-icon";
import { PrefixIcon } from "@grape-design/react";
import { ContextualFloatingButton } from "grape-design/ui/contextual-floating-button";

export default function ContextualFloatingButtonSolid() {
  return (
    <ContextualFloatingButton variant="solid">
      <PrefixIcon svg={<IconPlusLine />} />
      Solid Variant
    </ContextualFloatingButton>
  );
}
