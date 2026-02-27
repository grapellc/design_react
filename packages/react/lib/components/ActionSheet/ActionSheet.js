'use client';
import { actionSheet } from '@seed-design/css/recipes/action-sheet';
import { actionSheetItem } from '@seed-design/css/recipes/action-sheet-item';
import { Dialog, useDialogContext } from '@seed-design/react-dialog';
import { Primitive } from '@seed-design/react-primitive';
import { createRecipeContext } from '../../utils/createRecipeContext.js';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';
import { createWithStateProps } from '../../utils/createWithStateProps.js';

const { withRootProvider, withContext } = createSlotRecipeContext(actionSheet);
const { withContext: withItemContext } = createRecipeContext(actionSheetItem);
const withStateProps = createWithStateProps([useDialogContext]);
const ActionSheetRoot = withRootProvider(Dialog.Root, {
  defaultProps: {
    lazyMount: true,
    unmountOnExit: true
  }
});
const ActionSheetTrigger = Dialog.Trigger;
const ActionSheetPositioner = withContext(
  Dialog.Positioner,
  "positioner"
);
const ActionSheetBackdrop = withContext(
  Dialog.Backdrop,
  "backdrop"
);
const ActionSheetContent = withContext(
  Dialog.Content,
  "content"
);
const ActionSheetHeader = withContext(
  withStateProps(Primitive.div),
  "header"
);
const ActionSheetTitle = withContext(
  withStateProps(Primitive.h2),
  "title"
);
const ActionSheetDescription = withContext(withStateProps(Primitive.p), "description");
const ActionSheetList = withContext(
  withStateProps(Primitive.div),
  "list"
);
const ActionSheetItem = withItemContext(
  withStateProps(Primitive.button)
);
const ActionSheetCloseButton = withContext(
  Dialog.CloseButton,
  "closeButton"
);

export { ActionSheetBackdrop, ActionSheetCloseButton, ActionSheetContent, ActionSheetDescription, ActionSheetHeader, ActionSheetItem, ActionSheetList, ActionSheetPositioner, ActionSheetRoot, ActionSheetTitle, ActionSheetTrigger };
