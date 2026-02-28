"use client";

import { IconPlusFill } from "@karrotmarket/react-monochrome-icon";
import { Icon } from "@grape-design/react";
import { ActionButton } from "seed-design/ui/action-button";

export default function ActionButtonIconOnly() {
  return (
    <ActionButton layout="iconOnly" aria-label="Add">
      <Icon svg={<IconPlusFill />} />
    </ActionButton>
  );
}
