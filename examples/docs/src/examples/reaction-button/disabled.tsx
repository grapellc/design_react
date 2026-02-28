"use client";

import { IconFaceSmileCircleFill } from "@karrotmarket/react-monochrome-icon";
import { PrefixIcon } from "@grape-design/react";
import { ReactionButton } from "grape-design/ui/reaction-button";

export default function ReactionButtonDisabled() {
  return (
    <ReactionButton disabled>
      <PrefixIcon svg={<IconFaceSmileCircleFill />} />
      비활성
    </ReactionButton>
  );
}
