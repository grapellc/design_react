'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const chip = require('@grape-design/css/recipes/chip');
const reactPrimitive = require('@seed-design/react-primitive');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');
const Icon = require('../Icon/Icon.cjs');
const createWithStateProps = require('../../utils/createWithStateProps.cjs');
const reactCheckbox = require('@seed-design/react-checkbox');
const reactRadioGroup = require('@seed-design/react-radio-group');

const { withProvider, withContext } = createSlotRecipeContext.createSlotRecipeContext(chip.chip);
const withStateProps = createWithStateProps.createWithStateProps([
  { useContext: reactCheckbox.useCheckboxContext, strict: false },
  { useContext: reactRadioGroup.useRadioGroupItemContext, strict: false }
]);
const ChipRoot = Icon.withIconRequired(
  withProvider(reactPrimitive.Primitive.button, "root"),
  (props) => props.layout === "iconOnly"
);
ChipRoot.displayName = "Chip.Root";
const ChipLabel = withContext(
  withStateProps(reactPrimitive.Primitive.span),
  "label"
);
ChipLabel.displayName = "Chip.Label";
const ChipPrefixIcon = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "prefixIcon"
);
ChipPrefixIcon.displayName = "Chip.PrefixIcon";
const ChipPrefixAvatar = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "prefixAvatar"
);
ChipPrefixAvatar.displayName = "Chip.PrefixAvatar";
const ChipSuffixIcon = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "suffixIcon"
);
ChipSuffixIcon.displayName = "Chip.SuffixIcon";

exports.ChipLabel = ChipLabel;
exports.ChipPrefixAvatar = ChipPrefixAvatar;
exports.ChipPrefixIcon = ChipPrefixIcon;
exports.ChipRoot = ChipRoot;
exports.ChipSuffixIcon = ChipSuffixIcon;
