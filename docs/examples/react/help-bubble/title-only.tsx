import { IconSparkle2 } from "@karrotmarket/react-multicolor-icon";
import { Icon } from "@grape_design_react/react";
import { HelpBubbleAnchor } from "grape_design_react/ui/help-bubble";

export default function HelpBubbleTitleOnly() {
  return (
    <HelpBubbleAnchor open title="Title Only">
      <Icon svg={<IconSparkle2 />} />
    </HelpBubbleAnchor>
  );
}
