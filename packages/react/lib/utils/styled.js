'use client';
import { jsx } from 'react/jsx-runtime';
import { vars } from '@grape-design/css/vars';
import { forwardRef } from 'react';

function handleColor(color) {
  if (!color) {
    return void 0;
  }
  const [type, value] = color.split(".");
  return vars.$color[type]?.[value] ?? color;
}
function handleDimension(dimension) {
  if (dimension == null) {
    return void 0;
  }
  if (typeof dimension === "number") {
    return `${dimension}px`;
  }
  if (dimension === "full") {
    return "100%";
  }
  const [type, value] = dimension.split(".");
  return vars.$dimension[dimension] ?? vars.$dimension[type]?.[value] ?? dimension;
}
function handleBleed(dimension, direction) {
  if (dimension === "asPadding") {
    return `var(--seed-box-padding-${direction})`;
  }
  return handleDimension(dimension);
}
function handleShadow(shadow) {
  if (!shadow) {
    return void 0;
  }
  return vars.$shadow[shadow] ?? shadow;
}
function handlePaddingWithSafeArea(padding, direction) {
  if (padding === "safeArea") {
    return `var(--seed-safe-area-${direction})`;
  }
  const paddingValue = handleDimension(padding);
  return paddingValue;
}
function handleRadius(radius) {
  if (radius == null) {
    return void 0;
  }
  return vars.$radius[radius] ?? radius;
}
function handleGradient(gradientToken, direction) {
  if (!gradientToken || !direction) {
    return void 0;
  }
  const colorStops = vars.$gradient[gradientToken];
  if (!colorStops) {
    return void 0;
  }
  return `linear-gradient(${direction}, ${colorStops})`;
}
function handleDisplay(display) {
  if (!display) {
    return void 0;
  }
  if (process.env.NODE_ENV !== "production") {
    if (display === "inlineFlex" || display === "inlineBlock") {
      console.warn(
        `[Grape Design] display='${display}' is deprecated and will be removed in @grape-design/react@1.3.0. Use display='${display === "inlineFlex" ? "inline-flex" : "inline-block"}' instead.`
      );
    }
  }
  return {
    flex: "flex",
    inlineFlex: "inline-flex",
    // @deprecated Use `inline-flex` instead.
    inlineBlock: "inline-block",
    // @deprecated Use `inline-block` instead.
    none: "none"
  }[display] ?? display;
}
function handleFlexDirection(flexDirection) {
  if (!flexDirection) {
    return void 0;
  }
  if (process.env.NODE_ENV !== "production") {
    if (flexDirection === "rowReverse" || flexDirection === "columnReverse") {
      console.warn(
        `[Grape Design] flexDirection='${flexDirection}' is deprecated and will be removed in @grape-design/react@1.3.0. Use flexDirection='${flexDirection === "rowReverse" ? "row-reverse" : "column-reverse"}' instead.`
      );
    }
  }
  return {
    row: "row",
    column: "column",
    rowReverse: "row-reverse",
    // @deprecated Use `row-reverse` instead.
    columnReverse: "column-reverse"
    // @deprecated Use `column-reverse` instead.
  }[flexDirection] ?? flexDirection;
}
function handleJustifyContent(justifyContent) {
  if (!justifyContent) {
    return void 0;
  }
  if (process.env.NODE_ENV !== "production") {
    if (justifyContent === "flexStart" || justifyContent === "flexEnd") {
      console.warn(
        `[Grape Design] justifyContent='${justifyContent}' is deprecated and will be removed in @grape-design/react@1.3.0. Use justifyContent='${justifyContent === "flexStart" ? "flex-start" : "flex-end"}' instead.`
      );
    }
    if (justifyContent === "spaceBetween" || justifyContent === "spaceAround") {
      console.warn(
        `[Grape Design] justifyContent='${justifyContent}' is deprecated and will be removed in @grape-design/react@1.3.0. Use justifyContent='${justifyContent === "spaceBetween" ? "space-between" : "space-around"}' instead.`
      );
    }
  }
  return {
    flexStart: "flex-start",
    // @deprecated Use `flex-start` instead.
    flexEnd: "flex-end",
    // @deprecated Use `flex-end` instead.
    center: "center",
    spaceBetween: "space-between",
    // @deprecated Use `space-between` instead.
    spaceAround: "space-around"
    // @deprecated Use `space-around` instead.
  }[justifyContent] ?? justifyContent;
}
function handleAlignItems(alignItems) {
  if (!alignItems) {
    return void 0;
  }
  if (process.env.NODE_ENV !== "production") {
    if (alignItems === "flexStart" || alignItems === "flexEnd") {
      console.warn(
        `[Grape Design] alignItems='${alignItems}' is deprecated and will be removed in @grape-design/react@1.3.0. Use alignItems='${alignItems === "flexStart" ? "flex-start" : "flex-end"}' instead.`
      );
    }
  }
  return {
    flexStart: "flex-start",
    // @deprecated Use `flex-start` instead.
    flexEnd: "flex-end",
    // @deprecated Use `flex-end` instead.
    center: "center",
    stretch: "stretch"
  }[alignItems] ?? alignItems;
}
function useStyleProps(props) {
  const {
    background,
    bg,
    bgGradient,
    backgroundGradient,
    bgGradientDirection,
    backgroundGradientDirection,
    color,
    borderColor,
    borderWidth,
    borderTopWidth,
    borderRightWidth,
    borderBottomWidth,
    borderLeftWidth,
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomRightRadius,
    borderBottomLeftRadius,
    boxShadow,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    bleedX,
    bleedY,
    bleedTop,
    bleedRight,
    bleedBottom,
    bleedLeft,
    bottom,
    left,
    right,
    top,
    display,
    position,
    overflowX,
    overflowY,
    zIndex,
    flexGrow,
    flexShrink,
    flexDirection,
    flexWrap,
    justifyContent,
    justifySelf,
    alignItems,
    alignContent,
    alignSelf,
    gap,
    gridColumn,
    gridRow,
    unstable_transform,
    _active,
    style,
    ...restProps
  } = props;
  const gradientValue = handleGradient(
    bgGradient ?? backgroundGradient,
    bgGradientDirection ?? backgroundGradientDirection
  );
  return {
    style: {
      "--seed-box-background": handleColor(background ?? bg) ?? gradientValue,
      "--seed-box-color": handleColor(color),
      "--seed-box-border-color": handleColor(borderColor),
      "--seed-box-border-width": borderWidth !== void 0 ? `${borderWidth}px` : void 0,
      "--seed-box-border-top-width": borderTopWidth !== void 0 ? `${borderTopWidth}px` : void 0,
      "--seed-box-border-right-width": borderRightWidth !== void 0 ? `${borderRightWidth}px` : void 0,
      "--seed-box-border-bottom-width": borderBottomWidth !== void 0 ? `${borderBottomWidth}px` : void 0,
      "--seed-box-border-left-width": borderLeftWidth !== void 0 ? `${borderLeftWidth}px` : void 0,
      "--seed-box-border-radius": handleRadius(borderRadius),
      "--seed-box-border-top-left-radius": handleRadius(borderTopLeftRadius),
      "--seed-box-border-top-right-radius": handleRadius(borderTopRightRadius),
      "--seed-box-border-bottom-right-radius": handleRadius(borderBottomRightRadius),
      "--seed-box-border-bottom-left-radius": handleRadius(borderBottomLeftRadius),
      "--seed-box-box-shadow": handleShadow(boxShadow),
      "--seed-box-width": handleDimension(width),
      "--seed-box-min-width": handleDimension(minWidth),
      "--seed-box-max-width": handleDimension(maxWidth),
      "--seed-box-height": handleDimension(height),
      "--seed-box-min-height": handleDimension(minHeight),
      "--seed-box-max-height": handleDimension(maxHeight),
      "--seed-box-padding": handleDimension(padding ?? p),
      "--seed-box-padding-x": handleDimension(paddingX ?? px),
      "--seed-box-padding-y": handleDimension(paddingY ?? py),
      "--seed-box-padding-top": handlePaddingWithSafeArea(paddingTop ?? pt, "top"),
      "--seed-box-padding-right": handleDimension(paddingRight ?? pr),
      "--seed-box-padding-bottom": handlePaddingWithSafeArea(paddingBottom ?? pb, "bottom"),
      "--seed-box-padding-left": handleDimension(paddingLeft ?? pl),
      "--seed-box-bleed-top": handleBleed(bleedTop ?? bleedY, "top"),
      "--seed-box-bleed-right": handleBleed(bleedRight ?? bleedX, "right"),
      "--seed-box-bleed-bottom": handleBleed(bleedBottom ?? bleedY, "bottom"),
      "--seed-box-bleed-left": handleBleed(bleedLeft ?? bleedX, "left"),
      "--seed-box-top": top,
      "--seed-box-left": left,
      "--seed-box-right": right,
      "--seed-box-bottom": bottom,
      "--seed-box-gap": handleDimension(gap),
      "--seed-box-display": handleDisplay(display),
      "--seed-box-position": position,
      "--seed-box-overflow-x": overflowX,
      "--seed-box-overflow-y": overflowY,
      "--seed-box-z-index": zIndex,
      "--seed-box-flex-grow": flexGrow === true ? 1 : flexGrow,
      "--seed-box-flex-shrink": flexShrink === true ? 1 : flexShrink,
      "--seed-box-flex-direction": handleFlexDirection(flexDirection),
      "--seed-box-flex-wrap": flexWrap === true ? "wrap" : flexWrap,
      "--seed-box-justify-content": handleJustifyContent(justifyContent),
      "--seed-box-justify-self": justifySelf,
      "--seed-box-align-items": handleAlignItems(alignItems),
      "--seed-box-align-content": handleAlignItems(alignContent),
      "--seed-box-align-self": handleAlignItems(alignSelf),
      "--seed-box-grid-column": gridColumn,
      "--seed-box-grid-row": gridRow,
      "--seed-box-unstable-transform": unstable_transform,
      // Active
      "--seed-box-background--active": handleColor(_active?.bg ?? _active?.background),
      ...style
    },
    restProps
  };
}
function withStyleProps(Component) {
  const Node = forwardRef((props, ref) => {
    const { style, restProps } = useStyleProps(props);
    return /* @__PURE__ */ jsx(Component, { ref, style, ...restProps });
  });
  Node.displayName = Component.displayName || Component.name;
  return Node;
}

export { handleColor, handleDimension, handlePaddingWithSafeArea, handleRadius, useStyleProps, withStyleProps };
