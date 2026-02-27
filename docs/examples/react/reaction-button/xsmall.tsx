import { IconFaceSmileCircleFill } from "@karrotmarket/react-monochrome-icon";
import { Count, PrefixIcon } from "@grape_design_react/react";
import { ReactionButton } from "grape_design_react/ui/reaction-button";

export default function ReactionButtonXsmall() {
  return (
    <ReactionButton size="xsmall">
      <PrefixIcon svg={<IconFaceSmileCircleFill />} />
      도움돼요
      <Count>1</Count>
    </ReactionButton>
  );
}
