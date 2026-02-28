"use client";

import { ActionButton } from "grapu-design/ui/action-button";
import { HelpBubbleTrigger } from "grapu-design/ui/help-bubble";

export default function HelpBubbleCloseButton() {
  return (
    <HelpBubbleTrigger
      defaultOpen
      showCloseButton
      title="Close Button"
      description="showCloseButton으로 Close Button을 추가할 수 있어요."
    >
      <ActionButton variant="neutralSolid">토글</ActionButton>
    </HelpBubbleTrigger>
  );
}
