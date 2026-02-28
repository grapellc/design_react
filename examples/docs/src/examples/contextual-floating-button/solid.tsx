"use client";

import { IconPlusLine } from "@karrotmarket/react-monochrome-icon";
import { PrefixIcon } from "@grapu-design/react";
import { ContextualFloatingButton } from "grapu-design/ui/contextual-floating-button";

export default function ContextualFloatingButtonSolid() {
  return (
    <ContextualFloatingButton variant="solid">
      <PrefixIcon svg={<IconPlusLine />} />
      Solid Variant
    </ContextualFloatingButton>
  );
}
