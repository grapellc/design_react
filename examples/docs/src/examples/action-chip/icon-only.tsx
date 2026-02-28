"use client";

import { IconPlusFill } from "@karrotmarket/react-monochrome-icon";
import { ActionChip, Icon } from "@grape-design/react";

export default function ActionChipIconOnly() {
  return (
    <ActionChip layout="iconOnly" aria-label="Add">
      <Icon svg={<IconPlusFill />} />
    </ActionChip>
  );
}
