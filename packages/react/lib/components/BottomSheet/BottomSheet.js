'use client';
import { jsx } from 'react/jsx-runtime';
import { bottomSheet } from '@grape-design/css/recipes/bottom-sheet';
import { dataAttr } from '@grape-design/dom-utils';
import { Drawer, useDrawerContext } from '@grape-design/react-drawer';
import { Primitive } from '@grape-design/react-primitive';
import { forwardRef } from 'react';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';
import { withStyleProps } from '../../utils/styled.js';

const { withRootProvider, withContext } = createSlotRecipeContext(bottomSheet);
const BottomSheetRoot = withRootProvider(Drawer.Root, {
  defaultProps: {
    direction: "bottom"
  }
});
const BottomSheetTrigger = Drawer.Trigger;
const BottomSheetPositioner = withContext(
  Drawer.Positioner,
  "positioner"
);
const BottomSheetBackdrop = withContext(
  Drawer.Backdrop,
  "backdrop"
);
const BottomSheetContent = withContext(
  Drawer.Content,
  "content"
);
const BottomSheetHeader = withContext(
  Drawer.Header,
  "header"
);
const BottomSheetTitle = withContext(
  forwardRef((props, ref) => {
    const { isCloseButtonRendered } = useDrawerContext();
    return /* @__PURE__ */ jsx(Drawer.Title, { ref, "data-show-close-button": dataAttr(isCloseButtonRendered), ...props });
  }),
  "title"
);
BottomSheetTitle.displayName = "BottomSheetTitle";
const BottomSheetDescription = withContext(Drawer.Description, "description");
const BottomSheetBody = withContext(
  withStyleProps(Primitive.div),
  "body"
);
const BottomSheetFooter = withContext(
  Primitive.div,
  "footer"
);
const BottomSheetCloseButton = withContext(
  Drawer.CloseButton,
  "closeButton"
);

export { BottomSheetBackdrop, BottomSheetBody, BottomSheetCloseButton, BottomSheetContent, BottomSheetDescription, BottomSheetFooter, BottomSheetHeader, BottomSheetPositioner, BottomSheetRoot, BottomSheetTitle, BottomSheetTrigger };
