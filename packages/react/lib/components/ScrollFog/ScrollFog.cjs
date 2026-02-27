'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const scrollFog = require('@grape-design/css/recipes/scroll-fog');
const clsx = require('clsx');
const React = require('react');
const component = require('@grape-design/css/vars/component');

const ScrollFog = React.forwardRef(
  ({
    className,
    hideScrollBar,
    placement = ["top", "bottom"],
    size = component.scrollFog.base.enabled.root.size,
    sizes,
    style,
    ...props
  }, ref) => {
    const [variantProps, restProps] = scrollFog.scrollFog.splitVariantProps({
      hideScrollBar,
      ...props
    });
    const scrollFogClassName = scrollFog.scrollFog(variantProps);
    const sizePx = typeof size === "number" ? `${size}px` : size;
    const sizeStyle = React.useMemo(() => {
      const finalSizes = {
        top: sizes?.top ? `${sizes.top}px` : sizePx,
        bottom: sizes?.bottom ? `${sizes.bottom}px` : sizePx,
        left: sizes?.left ? `${sizes.left}px` : sizePx,
        right: sizes?.right ? `${sizes.right}px` : sizePx
      };
      return {
        "--scroll-fog-size-top": finalSizes.top,
        "--scroll-fog-size-bottom": finalSizes.bottom,
        "--scroll-fog-size-left": finalSizes.left,
        "--scroll-fog-size-right": finalSizes.right,
        // placement에 포함된 방향만 1, 나머지는 0
        "--scrollable-top": placement.includes("top") ? "1" : "0",
        "--scrollable-bottom": placement.includes("bottom") ? "1" : "0",
        "--scrollable-left": placement.includes("left") ? "1" : "0",
        "--scrollable-right": placement.includes("right") ? "1" : "0"
      };
    }, [sizePx, sizes, placement]);
    return /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        ref,
        className: clsx(scrollFogClassName, className),
        style: {
          ...style,
          ...sizeStyle
        },
        ...restProps
      }
    );
  }
);
ScrollFog.displayName = "ScrollFog";

exports.ScrollFog = ScrollFog;
