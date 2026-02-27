'use client';
import { floatingActionButton } from '@seed-design/css/recipes/floating-action-button';
import { Primitive } from '@seed-design/react-primitive';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';
import { InternalIcon } from '../private/Icon.js';

const { withProvider, withContext } = createSlotRecipeContext(floatingActionButton);
const FloatingActionButtonRoot = withProvider(Primitive.button, "root");
const FloatingActionButtonIcon = withContext(InternalIcon, "icon");
const FloatingActionButtonLabel = withContext(Primitive.span, "label");

export { FloatingActionButtonIcon, FloatingActionButtonLabel, FloatingActionButtonRoot };
