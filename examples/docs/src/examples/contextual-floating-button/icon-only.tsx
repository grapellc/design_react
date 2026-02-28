"use client";

import { IconPlusFill } from "@karrotmarket/react-monochrome-icon";
import { Icon } from "@grape-design/react";
import { ContextualFloatingButton } from "grape-design/ui/contextual-floating-button";

export default function ContextualFloatingButtonIconOnly() {
  return (
    <ContextualFloatingButton layout="iconOnly" aria-label="Add">
      <Icon svg={<IconPlusFill />} />
    </ContextualFloatingButton>
  );
}
