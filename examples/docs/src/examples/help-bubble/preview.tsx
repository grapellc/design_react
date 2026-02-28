"use client";

import { IconILowercaseSerifCircleLine } from "@karrotmarket/react-monochrome-icon";
import { HelpBubbleTrigger } from "grape-design/ui/help-bubble";
import { ActionButton } from "grape-design/ui/action-button";
import { Icon } from "@grape-design/react";

export default function HelpBubblePreview() {
  return (
    <HelpBubbleTrigger defaultOpen title="Click the button below or outside to close.">
      <ActionButton variant="ghost" size="small" layout="iconOnly" aria-label="도움말">
        <Icon svg={<IconILowercaseSerifCircleLine />} />
      </ActionButton>
    </HelpBubbleTrigger>
  );
}
