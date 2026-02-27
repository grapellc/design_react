import { IconPlusFill } from "@karrotmarket/react-monochrome-icon";
import { Icon } from "@grape_design_react/react";
import { ActionButton } from "grape_design_react/ui/action-button";

export default function ActionButtonIconOnly() {
  return (
    <ActionButton layout="iconOnly" aria-label="추가">
      <Icon svg={<IconPlusFill />} />
    </ActionButton>
  );
}
