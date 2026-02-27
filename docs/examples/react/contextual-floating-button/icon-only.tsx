import { IconPlusFill } from "@karrotmarket/react-monochrome-icon";
import { Icon } from "@grape_design_react/react";
import { ContextualFloatingButton } from "grape_design_react/ui/contextual-floating-button";

export default function ContextualFloatingButtonIconOnly() {
  return (
    <ContextualFloatingButton layout="iconOnly" aria-label="추가">
      <Icon svg={<IconPlusFill />} />
    </ContextualFloatingButton>
  );
}
