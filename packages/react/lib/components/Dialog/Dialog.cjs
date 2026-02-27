'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const reactDialog = require('@seed-design/react-dialog');
const reactPrimitive = require('@seed-design/react-primitive');
const dialog = require('@seed-design/css/recipes/dialog');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');
const createWithStateProps = require('../../utils/createWithStateProps.cjs');

const { withRootProvider, withContext } = createSlotRecipeContext.createSlotRecipeContext(dialog.dialog);
const withStateProps = createWithStateProps.createWithStateProps([reactDialog.useDialogContext]);
const DialogRoot = withRootProvider(reactDialog.Dialog.Root, {
  defaultProps: {
    lazyMount: true,
    unmountOnExit: true
  }
});
const DialogTrigger = reactDialog.Dialog.Trigger;
const DialogPositioner = withContext(
  reactDialog.Dialog.Positioner,
  "positioner"
);
const DialogBackdrop = withContext(
  reactDialog.Dialog.Backdrop,
  "backdrop"
);
const DialogContent = withContext(
  reactDialog.Dialog.Content,
  "content"
);
const DialogHeader = withContext(reactPrimitive.Primitive.div, "header");
const DialogTitle = withContext(
  withStateProps(reactPrimitive.Primitive.span),
  "title"
);
const DialogDescription = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "description"
);
const DialogFooter = withContext(reactPrimitive.Primitive.div, "footer");
const DialogAction = reactDialog.Dialog.CloseButton;

exports.DialogAction = DialogAction;
exports.DialogBackdrop = DialogBackdrop;
exports.DialogContent = DialogContent;
exports.DialogDescription = DialogDescription;
exports.DialogFooter = DialogFooter;
exports.DialogHeader = DialogHeader;
exports.DialogPositioner = DialogPositioner;
exports.DialogRoot = DialogRoot;
exports.DialogTitle = DialogTitle;
exports.DialogTrigger = DialogTrigger;
