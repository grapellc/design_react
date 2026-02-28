'use client';
import { jsx } from 'react/jsx-runtime';
import { listItem } from '@grape-design/css/recipes/list-item';
import { Primitive } from '@grape-design/react-primitive';
import { forwardRef } from 'react';
import { createSlotRecipeContext } from '../../utils/createSlotRecipeContext.js';
import { withStyleProps, handleRadius } from '../../utils/styled.js';
import { VStack } from '../Stack/Stack.js';
import { useCheckboxContext } from '@grape-design/react-checkbox';
import { createWithStateProps } from '../../utils/createWithStateProps.js';
import { useRadioGroupItemContext } from '@grape-design/react-radio-group';
import { useSwitchContext } from '@grape-design/react-switch';

const { withContext, withProvider } = createSlotRecipeContext(listItem);
const withStateProps = createWithStateProps([
  { useContext: useCheckboxContext, strict: false },
  { useContext: useRadioGroupItemContext, strict: false },
  { useContext: useSwitchContext, strict: false }
]);
const ListRoot = forwardRef(
  ({ as = "ul", style, itemBorderRadius, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      VStack,
      {
        as,
        ref,
        style: {
          ...style,
          "--list-item-border-radius": handleRadius(itemBorderRadius)
        },
        ...props
      }
    );
  }
);
const ListItem = withProvider(
  withStateProps(withStyleProps(Primitive.li)),
  "root"
);
const ListContent = withContext(
  withStateProps(withStyleProps(Primitive.div)),
  "content"
);
const ListPrefix = withContext(
  withStateProps(withStyleProps(Primitive.div)),
  "prefix"
);
const ListSuffix = withContext(
  withStateProps(withStyleProps(Primitive.div)),
  "suffix"
);
const ListTitle = withContext(
  withStateProps(Primitive.div),
  "title"
);
const ListDetail = withContext(
  withStateProps(Primitive.div),
  "detail"
);

export { ListContent, ListDetail, ListItem, ListPrefix, ListRoot, ListSuffix, ListTitle };
