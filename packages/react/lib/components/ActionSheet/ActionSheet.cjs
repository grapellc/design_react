'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const actionSheet = require('@grape-design/css/recipes/action-sheet');
const actionSheetItem = require('@grape-design/css/recipes/action-sheet-item');
const reactDialog = require('@seed-design/react-dialog');
const reactPrimitive = require('@seed-design/react-primitive');
const createRecipeContext = require('../../utils/createRecipeContext.cjs');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');
const createWithStateProps = require('../../utils/createWithStateProps.cjs');

const { withRootProvider, withContext } = createSlotRecipeContext.createSlotRecipeContext(actionSheet.actionSheet);
const { withContext: withItemContext } = createRecipeContext.createRecipeContext(actionSheetItem.actionSheetItem);
const withStateProps = createWithStateProps.createWithStateProps([reactDialog.useDialogContext]);
const ActionSheetRoot = withRootProvider(reactDialog.Dialog.Root, {
  defaultProps: {
    lazyMount: true,
    unmountOnExit: true
  }
});
const ActionSheetTrigger = reactDialog.Dialog.Trigger;
const ActionSheetPositioner = withContext(
  reactDialog.Dialog.Positioner,
  "positioner"
);
const ActionSheetBackdrop = withContext(
  reactDialog.Dialog.Backdrop,
  "backdrop"
);
const ActionSheetContent = withContext(
  reactDialog.Dialog.Content,
  "content"
);
const ActionSheetHeader = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "header"
);
const ActionSheetTitle = withContext(
  withStateProps(reactPrimitive.Primitive.h2),
  "title"
);
const ActionSheetDescription = withContext(withStateProps(reactPrimitive.Primitive.p), "description");
const ActionSheetList = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "list"
);
const ActionSheetItem = withItemContext(
  withStateProps(reactPrimitive.Primitive.button)
);
const ActionSheetCloseButton = withContext(
  reactDialog.Dialog.CloseButton,
  "closeButton"
);

exports.ActionSheetBackdrop = ActionSheetBackdrop;
exports.ActionSheetCloseButton = ActionSheetCloseButton;
exports.ActionSheetContent = ActionSheetContent;
exports.ActionSheetDescription = ActionSheetDescription;
exports.ActionSheetHeader = ActionSheetHeader;
exports.ActionSheetItem = ActionSheetItem;
exports.ActionSheetList = ActionSheetList;
exports.ActionSheetPositioner = ActionSheetPositioner;
exports.ActionSheetRoot = ActionSheetRoot;
exports.ActionSheetTitle = ActionSheetTitle;
exports.ActionSheetTrigger = ActionSheetTrigger;
