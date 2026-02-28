'use client';
import { jsx } from 'react/jsx-runtime';
import { Popover, usePopoverContext } from '@grape-design/react-popover';
import { Primitive } from '@grape-design/react-primitive';
import { helpBubble } from '@grape-design/css/recipes/help-bubble';
import { forwardRef } from 'react';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';
import { createWithStateProps } from '../../utils/createWithStateProps.js';
import { withStyleProps } from '../../utils/styled.js';
import { composeRefs } from '@radix-ui/react-compose-refs';
import clsx from 'clsx';

const { withRootProvider, withContext, useClassNames } = createSlotRecipeContext(helpBubble);
const withStateProps = createWithStateProps([usePopoverContext]);
const HelpBubbleRoot = withRootProvider(Popover.Root, {
  defaultProps: {
    placement: "top",
    gutter: 4,
    // TODO: get value from rootage spec
    overflowPadding: 16,
    arrowPadding: 14
  }
});
const HelpBubbleAnchor = Popover.Anchor;
const HelpBubbleTrigger = Popover.Trigger;
const HelpBubblePositioner = withContext(
  Popover.Positioner,
  "positioner"
);
const HelpBubblePositionerPortal = withContext(Popover.PositionerPortal, "positioner");
const HelpBubbleContent = withContext(
  withStyleProps(withStateProps(Primitive.div)),
  "content"
);
const HelpBubbleArrow = withContext(
  Popover.Arrow,
  "arrow"
);
const HelpBubbleArrowTip = forwardRef(
  (props, ref) => {
    const {
      tipRadius = 2,
      // TODO: get value from rootage spec
      className,
      ...otherProps
    } = props;
    const api = usePopoverContext();
    const classNames = useClassNames();
    const width = api.rects.arrowTip?.width || 0;
    const height = api.rects.arrowTip?.height || 0;
    const pathData = `M0,0
      H${width}
      L${width / 2 + tipRadius},${height - tipRadius}
      Q${width / 2},${height} ${width / 2 - tipRadius},${height - tipRadius}
      Z`;
    return /* @__PURE__ */ jsx(
      "svg",
      {
        "aria-hidden": "true",
        viewBox: `0 0 ${width} ${height}`,
        ref: composeRefs(api.refs.arrowTip, ref),
        className: clsx(classNames.arrowTip, className),
        ...otherProps,
        children: /* @__PURE__ */ jsx("path", { stroke: "none", d: pathData })
      }
    );
  }
);
HelpBubbleArrowTip.displayName = "HelpBubbleArrowTip";
const HelpBubbleCloseButton = withContext(
  Popover.CloseButton,
  "closeButton"
);
const HelpBubbleBody = withContext(
  withStateProps(Primitive.div),
  "body"
);
const HelpBubbleTitle = withContext(
  withStateProps(Primitive.span),
  "title"
);
const HelpBubbleDescription = withContext(
  withStateProps(Primitive.div),
  "description"
);

export { HelpBubbleAnchor, HelpBubbleArrow, HelpBubbleArrowTip, HelpBubbleBody, HelpBubbleCloseButton, HelpBubbleContent, HelpBubbleDescription, HelpBubblePositioner, HelpBubblePositionerPortal, HelpBubbleRoot, HelpBubbleTitle, HelpBubbleTrigger };
