'use client';
import { chip } from '@seed-design/css/recipes/chip';
import { Primitive } from '@seed-design/react-primitive';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';
import { withIconRequired } from '../Icon/Icon.js';
import { createWithStateProps } from '../../utils/createWithStateProps.js';
import { useCheckboxContext } from '@seed-design/react-checkbox';
import { useRadioGroupItemContext } from '@seed-design/react-radio-group';

const { withProvider, withContext } = createSlotRecipeContext(chip);
const withStateProps = createWithStateProps([
  { useContext: useCheckboxContext, strict: false },
  { useContext: useRadioGroupItemContext, strict: false }
]);
const ChipRoot = withIconRequired(
  withProvider(Primitive.button, "root"),
  (props) => props.layout === "iconOnly"
);
ChipRoot.displayName = "Chip.Root";
const ChipLabel = withContext(
  withStateProps(Primitive.span),
  "label"
);
ChipLabel.displayName = "Chip.Label";
const ChipPrefixIcon = withContext(
  withStateProps(Primitive.div),
  "prefixIcon"
);
ChipPrefixIcon.displayName = "Chip.PrefixIcon";
const ChipPrefixAvatar = withContext(
  withStateProps(Primitive.div),
  "prefixAvatar"
);
ChipPrefixAvatar.displayName = "Chip.PrefixAvatar";
const ChipSuffixIcon = withContext(
  withStateProps(Primitive.div),
  "suffixIcon"
);
ChipSuffixIcon.displayName = "Chip.SuffixIcon";

export { ChipLabel, ChipPrefixAvatar, ChipPrefixIcon, ChipRoot, ChipSuffixIcon };
