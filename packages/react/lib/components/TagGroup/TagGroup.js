'use client';
import { jsx, jsxs } from 'react/jsx-runtime';
import { Primitive } from '@seed-design/react-primitive';
import { tagGroup } from '@grape-design/css/recipes/tag-group';
import { tagGroupItem } from '@grape-design/css/recipes/tag-group-item';
import { forwardRef, Children, Fragment } from 'react';
import clsx from 'clsx';
import { splitMultipleVariantsProps } from '../../utils/splitMultipleVariantsProps.js';
import { useStyleProps } from '../../utils/styled.js';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';

const { PropsProvider, useProps, withContext, ClassNamesProvider } = createSlotRecipeContext(tagGroupItem);
const TagGroupRoot = forwardRef(
  ({ className, children, separator = " · ", ...props }, ref) => {
    const [{ tagGroup: tagGroupVariantProps, tagGroupItem: tagGroupItemVariantProps }, otherProps] = splitMultipleVariantsProps(props, { tagGroup, tagGroupItem });
    const classNames = tagGroup(tagGroupVariantProps);
    return /* @__PURE__ */ jsx(PropsProvider, { value: tagGroupItemVariantProps, children: /* @__PURE__ */ jsx(Primitive.span, { ref, className: clsx(classNames.root, className), ...otherProps, children: Children.toArray(children).filter((child) => child !== null && child !== void 0).map((child, index) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: those fragments won't change order
      /* @__PURE__ */ jsxs(Fragment, { children: [
        index > 0 && /* @__PURE__ */ jsx(Primitive.span, { "aria-hidden": true, className: classNames.separator, children: separator }),
        child
      ] }, index)
    )) }) });
  }
);
const TagGroupItem = forwardRef(
  ({ className, ...props }, ref) => {
    const parentVariantProps = useProps();
    const [variantProps, otherProps] = tagGroupItem.splitVariantProps(props);
    const classNames = tagGroupItem({ ...parentVariantProps, ...variantProps });
    const { style, restProps } = useStyleProps(otherProps);
    return /* @__PURE__ */ jsx(ClassNamesProvider, { value: classNames, children: /* @__PURE__ */ jsx(
      Primitive.span,
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
  Primitive.span,
  "label"
);

export { TagGroupItem, TagGroupItemLabel, TagGroupRoot };
