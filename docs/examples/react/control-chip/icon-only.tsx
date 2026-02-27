import { IconPlusFill } from "@karrotmarket/react-monochrome-icon";
import { Icon } from "@grape_design_react/react";
import { ControlChip } from "grape_design_react/ui/control-chip";

export default function ControlChipIconOnly() {
  return (
    <ControlChip.Toggle layout="iconOnly" inputProps={{ "aria-label": "추가" }}>
      <Icon svg={<IconPlusFill />} />
    </ControlChip.Toggle>
  );
}
