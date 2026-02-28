'use client';
import { Dialog, useDialogContext } from '@grape-design/react-dialog';
import { Primitive } from '@grape-design/react-primitive';
import { dialog } from '@grape-design/css/recipes/dialog';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';
import { createWithStateProps } from '../../utils/createWithStateProps.js';

const { withRootProvider, withContext } = createSlotRecipeContext(dialog);
const withStateProps = createWithStateProps([useDialogContext]);
const DialogRoot = withRootProvider(Dialog.Root, {
  defaultProps: {
    lazyMount: true,
    unmountOnExit: true
  }
});
const DialogTrigger = Dialog.Trigger;
const DialogPositioner = withContext(
  Dialog.Positioner,
  "positioner"
);
const DialogBackdrop = withContext(
  Dialog.Backdrop,
  "backdrop"
);
const DialogContent = withContext(
  Dialog.Content,
  "content"
);
const DialogHeader = withContext(Primitive.div, "header");
const DialogTitle = withContext(
  withStateProps(Primitive.span),
  "title"
);
const DialogDescription = withContext(
  withStateProps(Primitive.div),
  "description"
);
const DialogFooter = withContext(Primitive.div, "footer");
const DialogAction = Dialog.CloseButton;

export { DialogAction, DialogBackdrop, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogPositioner, DialogRoot, DialogTitle, DialogTrigger };
