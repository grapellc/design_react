'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const reactPopover = require('@grape-design/react-popover');
const reactPrimitive = require('@grape-design/react-primitive');
const helpBubble = require('@grape-design/css/recipes/help-bubble');
const React = require('react');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');
const createWithStateProps = require('../../utils/createWithStateProps.cjs');
const styled = require('../../utils/styled.cjs');
const reactComposeRefs = require('@radix-ui/react-compose-refs');
const clsx = require('clsx');

const { withRootProvider, withContext, useClassNames } = createSlotRecipeContext.createSlotRecipeContext(helpBubble.helpBubble);
const withStateProps = createWithStateProps.createWithStateProps([reactPopover.usePopoverContext]);
const HelpBubbleRoot = withRootProvider(reactPopover.Popover.Root, {
  defaultProps: {
    placement: "top",
    gutter: 4,
    // TODO: get value from rootage spec
    overflowPadding: 16,
    arrowPadding: 14
  }
});
const HelpBubbleAnchor = reactPopover.Popover.Anchor;
const HelpBubbleTrigger = reactPopover.Popover.Trigger;
const HelpBubblePositioner = withContext(
  reactPopover.Popover.Positioner,
  "positioner"
);
const HelpBubblePositionerPortal = withContext(reactPopover.Popover.PositionerPortal, "positioner");
const HelpBubbleContent = withContext(
  styled.withStyleProps(withStateProps(reactPrimitive.Primitive.div)),
  "content"
);
const HelpBubbleArrow = withContext(
  reactPopover.Popover.Arrow,
  "arrow"
);
const HelpBubbleArrowTip = React.forwardRef(
  (props, ref) => {
    const {
      tipRadius = 2,
      // TODO: get value from rootage spec
      className,
      ...otherProps
    } = props;
    const api = reactPopover.usePopoverContext();
    const classNames = useClassNames();
    const width = api.rects.arrowTip?.width || 0;
    const height = api.rects.arrowTip?.height || 0;
    const pathData = `M0,0
      H${width}
      L${width / 2 + tipRadius},${height - tipRadius}
      Q${width / 2},${height} ${width / 2 - tipRadius},${height - tipRadius}
      Z`;
    return /* @__PURE__ */ jsxRuntime.jsx(
      "svg",
      {
        "aria-hidden": "true",
        viewBox: `0 0 ${width} ${height}`,
        ref: reactComposeRefs.composeRefs(api.refs.arrowTip, ref),
        className: clsx(classNames.arrowTip, className),
        ...otherProps,
        children: /* @__PURE__ */ jsxRuntime.jsx("path", { stroke: "none", d: pathData })
      }
    );
  }
);
HelpBubbleArrowTip.displayName = "HelpBubbleArrowTip";
const HelpBubbleCloseButton = withContext(
  reactPopover.Popover.CloseButton,
  "closeButton"
);
const HelpBubbleBody = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "body"
);
const HelpBubbleTitle = withContext(
  withStateProps(reactPrimitive.Primitive.span),
  "title"
);
const HelpBubbleDescription = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "description"
);

exports.HelpBubbleAnchor = HelpBubbleAnchor;
exports.HelpBubbleArrow = HelpBubbleArrow;
exports.HelpBubbleArrowTip = HelpBubbleArrowTip;
exports.HelpBubbleBody = HelpBubbleBody;
exports.HelpBubbleCloseButton = HelpBubbleCloseButton;
exports.HelpBubbleContent = HelpBubbleContent;
exports.HelpBubbleDescription = HelpBubbleDescription;
exports.HelpBubblePositioner = HelpBubblePositioner;
exports.HelpBubblePositionerPortal = HelpBubblePositionerPortal;
exports.HelpBubbleRoot = HelpBubbleRoot;
exports.HelpBubbleTitle = HelpBubbleTitle;
exports.HelpBubbleTrigger = HelpBubbleTrigger;
