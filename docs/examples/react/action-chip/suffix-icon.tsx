import { IconChevronDownFill } from "@karrotmarket/react-monochrome-icon";
import { ActionChip, SuffixIcon } from "@grape_design_react/react";

export default function ActionChipSuffixIcon() {
  return (
    <ActionChip>
      라벨
      <SuffixIcon svg={<IconChevronDownFill />} />
    </ActionChip>
  );
}
