'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const reactPrimitive = require('@grape-design/react-primitive');
const tagGroup = require('@grape-design/css/recipes/tag-group');
const tagGroupItem = require('@grape-design/css/recipes/tag-group-item');
const React = require('react');
const clsx = require('clsx');
const splitMultipleVariantsProps = require('../../utils/splitMultipleVariantsProps.cjs');
const styled = require('../../utils/styled.cjs');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');

const { PropsProvider, useProps, withContext, ClassNamesProvider } = createSlotRecipeContext.createSlotRecipeContext(tagGroupItem.tagGroupItem);
const TagGroupRoot = React.forwardRef(
  ({ className, children, separator = " · ", ...props }, ref) => {
    const [{ tagGroup: tagGroupVariantProps, tagGroupItem: tagGroupItemVariantProps }, otherProps] = splitMultipleVariantsProps.splitMultipleVariantsProps(props, { tagGroup: tagGroup.tagGroup, tagGroupItem: tagGroupItem.tagGroupItem });
    const classNames = tagGroup.tagGroup(tagGroupVariantProps);
    return /* @__PURE__ */ jsxRuntime.jsx(PropsProvider, { value: tagGroupItemVariantProps, children: /* @__PURE__ */ jsxRuntime.jsx(reactPrimitive.Primitive.span, { ref, className: clsx(classNames.root, className), ...otherProps, children: React.Children.toArray(children).filter((child) => child !== null && child !== void 0).map((child, index) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: those fragments won't change order
      /* @__PURE__ */ jsxRuntime.jsxs(React.Fragment, { children: [
        index > 0 && /* @__PURE__ */ jsxRuntime.jsx(reactPrimitive.Primitive.span, { "aria-hidden": true, className: classNames.separator, children: separator }),
        child
      ] }, index)
    )) }) });
  }
);
const TagGroupItem = React.forwardRef(
  ({ className, ...props }, ref) => {
    const parentVariantProps = useProps();
    const [variantProps, otherProps] = tagGroupItem.tagGroupItem.splitVariantProps(props);
    const classNames = tagGroupItem.tagGroupItem({ ...parentVariantProps, ...variantProps });
    const { style, restProps } = styled.useStyleProps(otherProps);
    return /* @__PURE__ */ jsxRuntime.jsx(ClassNamesProvider, { value: classNames, children: /* @__PURE__ */ jsxRuntime.jsx(
      reactPrimitive.Primitive.span,
      {
        ref,
        style,
        className: clsx(classNames.root, className),
        ...restProps
      }
    ) });
  }
);
const TagGroupItemLabel = withContext(
  reactPrimitive.Primitive.span,
  "label"
);

exports.TagGroupItem = TagGroupItem;
exports.TagGroupItemLabel = TagGroupItemLabel;
exports.TagGroupRoot = TagGroupRoot;
