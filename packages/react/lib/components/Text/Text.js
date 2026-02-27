'use client';
import { jsx } from 'react/jsx-runtime';
import { text } from '@grape-design/css/recipes/text';
import { vars } from '@grape-design/css/vars';
import clsx from 'clsx';
import { forwardRef, useMemo } from 'react';

function handleColor(color) {
  if (!color) {
    return void 0;
  }
  const [type, value] = color.split(".");
  return vars.$color[type]?.[value] ?? color;
}
function handleFontWeight(fontWeight) {
  if (!fontWeight) {
    return void 0;
  }
  return vars.$fontWeight[fontWeight] ?? void 0;
}
function handleFontSize(size) {
  if (!size) {
    return void 0;
  }
  return vars.$fontSize[size] ?? size;
}
function handleLineHeight(lineHeight) {
  if (!lineHeight) {
    return void 0;
  }
  return vars.$lineHeight[lineHeight] ?? lineHeight;
}
function mapMaxLines(maxLines) {
  if (maxLines === void 0) {
    return "none";
  }
  if (maxLines === 1) {
    return "single";
  }
  return "multi";
}
const Text = forwardRef(
  ({
    as,
    color,
    textStyle,
    fontSize,
    lineHeight,
    fontWeight,
    maxLines,
    textDecorationLine,
    align,
    userSelect,
    whiteSpace,
    children,
    className,
    style,
    ...otherProps
  }, ref) => {
    const Comp = as || "span";
    const textClassName = useMemo(
      () => text({
        textStyle,
        textDecorationLine,
        maxLines: mapMaxLines(maxLines)
      }),
      [textStyle, textDecorationLine, maxLines]
    );
    return /* @__PURE__ */ jsx(
      Comp,
      {
        ref,
        className: clsx(textClassName, className),
        style: {
          "--seed-max-lines": maxLines,
          "--seed-text-color": handleColor(color),
          "--seed-font-size": handleFontSize(fontSize),
          "--seed-line-height": handleLineHeight(lineHeight ?? fontSize),
          "--seed-font-weight": handleFontWeight(fontWeight),
          "--seed-text-align": align,
          "--seed-user-select": userSelect,
          "--seed-white-space": whiteSpace,
          ...style
        },
        ...otherProps,
        children
      }
    );
  }
);
Text.displayName = "Text";

export { Text };
