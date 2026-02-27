'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const floatingActionButton = require('@grape-design/css/recipes/floating-action-button');
const reactPrimitive = require('@seed-design/react-primitive');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');
const Icon = require('../private/Icon.cjs');

const { withProvider, withContext } = createSlotRecipeContext.createSlotRecipeContext(floatingActionButton.floatingActionButton);
const FloatingActionButtonRoot = withProvider(reactPrimitive.Primitive.button, "root");
const FloatingActionButtonIcon = withContext(Icon.InternalIcon, "icon");
const FloatingActionButtonLabel = withContext(reactPrimitive.Primitive.span, "label");

exports.FloatingActionButtonIcon = FloatingActionButtonIcon;
exports.FloatingActionButtonLabel = FloatingActionButtonLabel;
exports.FloatingActionButtonRoot = FloatingActionButtonRoot;
