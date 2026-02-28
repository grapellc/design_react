"use client";

import { IconChevronDownFill } from "@karrotmarket/react-monochrome-icon";
import { SuffixIcon } from "@grapu-design/react";
import { ControlChip } from "grapu-design/ui/control-chip";

export default function ControlChipSuffixIcon() {
  return (
    <ControlChip.Toggle>
      라벨
      <SuffixIcon svg={<IconChevronDownFill />} />
    </ControlChip.Toggle>
  );
}
