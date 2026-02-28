"use client";

import { IconPlusFill } from "@karrotmarket/react-monochrome-icon";
import { PrefixIcon } from "@grapu-design/react";
import { ControlChip } from "grapu-design/ui/control-chip";

export default function ControlChipPrefixIcon() {
  return (
    <ControlChip.Toggle>
      <PrefixIcon svg={<IconPlusFill />} />
      라벨
    </ControlChip.Toggle>
  );
}
