import { IconChevronRightFill } from "@karrotmarket/react-monochrome-icon";
import { SuffixIcon } from "@grape_design_react/react";
import { ActionButton } from "grape_design_react/ui/action-button";

export default function ActionButtonSuffixIcon() {
  return (
    <ActionButton>
      라벨
      <SuffixIcon svg={<IconChevronRightFill />} />
    </ActionButton>
  );
}
