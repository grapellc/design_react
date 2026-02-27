'use client';
import { jsxs, jsx } from 'react/jsx-runtime';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { useStyleProps, handleDimension } from '../../utils/styled.js';
import { Flex } from '../Flex/Flex.js';

const ResponsivePair = React.forwardRef(
  (props, ref) => {
    const { wrap = "wrap-reverse", gap, children, ...rest } = props;
    const childrenArray = React.Children.toArray(children);
    const { style } = useStyleProps({
      minWidth: `calc(${100 / childrenArray.length}% - ${handleDimension(gap)} / ${childrenArray.length})`,
      flexGrow: 1
    });
    return /* @__PURE__ */ jsxs(
      Flex,
      {
        ref,
        display: "flex",
        flexDirection: "row",
        alignContent: "stretch",
        flexWrap: wrap,
        gap,
        ...rest,
        children: [
          /* @__PURE__ */ jsx(Slot, { style, children: childrenArray[0] }),
          /* @__PURE__ */ jsx(Slot, { style, children: childrenArray[1] })
        ]
      }
    );
  }
);

export { ResponsivePair };
