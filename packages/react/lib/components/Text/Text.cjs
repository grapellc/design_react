'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const text = require('@grape-design/css/recipes/text');
const vars = require('@grape-design/css/vars');
const clsx = require('clsx');
const React = require('react');

function handleColor(color) {
  if (!color) {
    return void 0;
  }
  const [type, value] = color.split(".");
  return vars.vars.$color[type]?.[value] ?? color;
}
function handleFontWeight(fontWeight) {
  if (!fontWeight) {
    return void 0;
  }
  return vars.vars.$fontWeight[fontWeight] ?? void 0;
}
function handleFontSize(size) {
  if (!size) {
    return void 0;
  }
  return vars.vars.$fontSize[size] ?? size;
}
function handleLineHeight(lineHeight) {
  if (!lineHeight) {
    return void 0;
  }
  return vars.vars.$lineHeight[lineHeight] ?? lineHeight;
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
const Text = React.forwardRef(
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
    const textClassName = React.useMemo(
      () => text.text({
        textStyle,
        textDecorationLine,
        maxLines: mapMaxLines(maxLines)
      }),
      [textStyle, textDecorationLine, maxLines]
    );
    return /* @__PURE__ */ jsxRuntime.jsx(
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

exports.Text = Text;
