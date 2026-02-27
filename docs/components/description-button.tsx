import IconILowercaseSerifCircleLine from "@karrotmarket/react-monochrome-icon/IconILowercaseSerifCircleLine";
import { Icon } from "@grape_design_react/react";
import { ActionButton } from "grape_design_react/ui/action-button";
import { HelpBubbleTrigger } from "grape_design_react/ui/help-bubble";

export function DescriptionButton({ description }: { description: string }) {
  return (
    <HelpBubbleTrigger title={description} placement="top">
      <ActionButton
        size="xsmall"
        variant="ghost"
        layout="iconOnly"
        aria-label="설명 보기"
        bleedX="asPadding"
        bleedY="asPadding"
        onClick={(e) => e.stopPropagation()}
      >
        <Icon svg={<IconILowercaseSerifCircleLine />} />
      </ActionButton>
    </HelpBubbleTrigger>
  );
}
