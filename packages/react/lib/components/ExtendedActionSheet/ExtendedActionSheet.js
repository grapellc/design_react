'use client';
import { Dialog, useDialogContext } from '@seed-design/react-dialog';
import { Primitive } from '@seed-design/react-primitive';
import { extendedActionSheet } from '@seed-design/css/recipes/extended-action-sheet';
import { extendedActionSheetItem } from '@seed-design/css/recipes/extended-action-sheet-item';
import { createRecipeContext } from '../../utils/createRecipeContext.js';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';
import { createWithStateProps } from '../../utils/createWithStateProps.js';

const { withRootProvider, withContext } = createSlotRecipeContext(extendedActionSheet);
const { withContext: withItemContext } = createRecipeContext(extendedActionSheetItem);
const withStateProps = createWithStateProps([useDialogContext]);
const ExtendedActionSheetRoot = withRootProvider(
  Dialog.Root,
  {
    defaultProps: {
      lazyMount: true,
      unmountOnExit: true
    }
  }
);
const ExtendedActionSheetTrigger = Dialog.Trigger;
const ExtendedActionSheetPositioner = withContext(Dialog.Positioner, "positioner");
const ExtendedActionSheetBackdrop = withContext(Dialog.Backdrop, "backdrop");
const ExtendedActionSheetContent = withContext(Dialog.Content, "content");
const ExtendedActionSheetHeader = withContext(withStateProps(Primitive.div), "header");
const ExtendedActionSheetTitle = withContext(withStateProps(Primitive.h2), "title");
const ExtendedActionSheetList = withContext(
  withStateProps(Primitive.div),
  "list"
);
const ExtendedActionSheetGroup = withContext(
  withStateProps(Primitive.div),
  "group"
);
const ExtendedActionSheetItem = withItemContext(withStateProps(Primitive.button));
const ExtendedActionSheetFooter = withContext(withStateProps(Primitive.div), "footer");
const ExtendedActionSheetCloseButton = withContext(Dialog.CloseButton, "closeButton");

export { ExtendedActionSheetBackdrop, ExtendedActionSheetCloseButton, ExtendedActionSheetContent, ExtendedActionSheetFooter, ExtendedActionSheetGroup, ExtendedActionSheetHeader, ExtendedActionSheetItem, ExtendedActionSheetList, ExtendedActionSheetPositioner, ExtendedActionSheetRoot, ExtendedActionSheetTitle, ExtendedActionSheetTrigger };
