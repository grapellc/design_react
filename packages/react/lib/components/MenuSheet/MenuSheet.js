'use client';
import { jsx } from 'react/jsx-runtime';
import { Dialog, useDialogContext } from '@seed-design/react-dialog';
import { Primitive } from '@seed-design/react-primitive';
import { menuSheet } from '@seed-design/css/recipes/menu-sheet';
import { menuSheetItem } from '@seed-design/css/recipes/menu-sheet-item';
import * as React from 'react';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';
import { createWithStateProps } from '../../utils/createWithStateProps.js';
import clsx from 'clsx';

const { withRootProvider, withContext, useClassNames } = createSlotRecipeContext(menuSheet);
const {
  PropsProvider: ItemPropsProvider,
  useProps: useItemProps,
  withContext: withItemContext,
  ClassNamesProvider: ItemClassNamesProvider
} = createSlotRecipeContext(menuSheetItem);
const withStateProps = createWithStateProps([useDialogContext]);
const MenuSheetRoot = withRootProvider(Dialog.Root, {
  defaultProps: {
    lazyMount: true,
    unmountOnExit: true
  }
});
const MenuSheetTrigger = Dialog.Trigger;
const MenuSheetPositioner = withContext(
  Dialog.Positioner,
  "positioner"
);
const MenuSheetBackdrop = withContext(
  Dialog.Backdrop,
  "backdrop"
);
const MenuSheetContent = React.forwardRef(
  ({ className, ...props }, ref) => {
    const [variantProps, otherProps] = menuSheetItem.splitVariantProps(props);
    const classNames = useClassNames();
    return /* @__PURE__ */ jsx(ItemPropsProvider, { value: variantProps, children: /* @__PURE__ */ jsx(
      Dialog.Content,
      {
        className: clsx(classNames.content, className),
        ref,
        ...otherProps
      }
    ) });
  }
);
const MenuSheetHeader = withContext(
  withStateProps(Primitive.div),
  "header"
);
const MenuSheetTitle = withContext(
  withStateProps(Primitive.h2),
  "title"
);
const MenuSheetDescription = withContext(
  withStateProps(Primitive.p),
  "description"
);
const MenuSheetList = withContext(
  withStateProps(Primitive.div),
  "list"
);
const MenuSheetGroup = React.forwardRef(
  ({ className, ...props }, ref) => {
    const [variantProps, otherProps] = menuSheetItem.splitVariantProps(props);
    const parentProps = useItemProps();
    const classNames = useClassNames();
    const { stateProps } = useDialogContext();
    return /* @__PURE__ */ jsx(ItemPropsProvider, { value: { ...parentProps, ...variantProps }, children: /* @__PURE__ */ jsx(
      Primitive.div,
      {
        className: clsx(classNames.group, className),
        ref,
        ...stateProps,
        ...otherProps
      }
    ) });
  }
);
const MenuSheetItem = React.forwardRef(
  ({ className: propClassName, ...props }, ref) => {
    const [variantProps, otherProps] = menuSheetItem.splitVariantProps(props);
    const parentProps = useItemProps();
    const classNames = menuSheetItem({ ...parentProps, ...variantProps });
    const { stateProps } = useDialogContext();
    return /* @__PURE__ */ jsx(ItemClassNamesProvider, { value: classNames, children: /* @__PURE__ */ jsx(
      Primitive.button,
      {
        ref,
        className: clsx(classNames.root, propClassName),
        ...stateProps,
        ...otherProps
      }
    ) });
  }
);
const MenuSheetItemContent = withItemContext(
  withStateProps(Primitive.div),
  "content"
);
const MenuSheetItemLabel = withItemContext(
  withStateProps(Primitive.span),
  "label"
);
const MenuSheetItemDescription = withItemContext(withStateProps(Primitive.span), "description");
const MenuSheetFooter = withContext(
  withStateProps(Primitive.div),
  "footer"
);
const MenuSheetCloseButton = withContext(
  Dialog.CloseButton,
  "closeButton"
);

export { MenuSheetBackdrop, MenuSheetCloseButton, MenuSheetContent, MenuSheetDescription, MenuSheetFooter, MenuSheetGroup, MenuSheetHeader, MenuSheetItem, MenuSheetItemContent, MenuSheetItemDescription, MenuSheetItemLabel, MenuSheetList, MenuSheetPositioner, MenuSheetRoot, MenuSheetTitle, MenuSheetTrigger };
