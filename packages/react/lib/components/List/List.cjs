'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const listItem = require('@grape-design/css/recipes/list-item');
const reactPrimitive = require('@seed-design/react-primitive');
const React = require('react');
const createSlotRecipeContext = require('../../utils/createSlotRecipeContext.cjs');
const styled = require('../../utils/styled.cjs');
const Stack = require('../Stack/Stack.cjs');
const reactCheckbox = require('@seed-design/react-checkbox');
const createWithStateProps = require('../../utils/createWithStateProps.cjs');
const reactRadioGroup = require('@seed-design/react-radio-group');
const reactSwitch = require('@seed-design/react-switch');

const { withContext, withProvider } = createSlotRecipeContext.createSlotRecipeContext(listItem.listItem);
const withStateProps = createWithStateProps.createWithStateProps([
  { useContext: reactCheckbox.useCheckboxContext, strict: false },
  { useContext: reactRadioGroup.useRadioGroupItemContext, strict: false },
  { useContext: reactSwitch.useSwitchContext, strict: false }
]);
const ListRoot = React.forwardRef(
  ({ as = "ul", style, itemBorderRadius, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      Stack.VStack,
      {
        as,
        ref,
        style: {
          ...style,
          "--list-item-border-radius": styled.handleRadius(itemBorderRadius)
        },
        ...props
      }
    );
  }
);
const ListItem = withProvider(
  withStateProps(styled.withStyleProps(reactPrimitive.Primitive.li)),
  "root"
);
const ListContent = withContext(
  withStateProps(styled.withStyleProps(reactPrimitive.Primitive.div)),
  "content"
);
const ListPrefix = withContext(
  withStateProps(styled.withStyleProps(reactPrimitive.Primitive.div)),
  "prefix"
);
const ListSuffix = withContext(
  withStateProps(styled.withStyleProps(reactPrimitive.Primitive.div)),
  "suffix"
);
const ListTitle = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "title"
);
const ListDetail = withContext(
  withStateProps(reactPrimitive.Primitive.div),
  "detail"
);

exports.ListContent = ListContent;
exports.ListDetail = ListDetail;
exports.ListItem = ListItem;
exports.ListPrefix = ListPrefix;
exports.ListRoot = ListRoot;
exports.ListSuffix = ListSuffix;
exports.ListTitle = ListTitle;
