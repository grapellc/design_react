import { IconFaceSmileCircleFill } from "@karrotmarket/react-monochrome-icon";
import { Count, PrefixIcon } from "@grape_design_react/react";
import { ReactionButton } from "grape_design_react/ui/reaction-button";

export default function ReactionButtonPreview() {
  return (
    <ReactionButton>
      <PrefixIcon svg={<IconFaceSmileCircleFill />} />
      도움돼요
      <Count>1</Count>
    </ReactionButton>
  );
}
