'use client';
import { jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { Box } from '../Box/Box.js';

const Divider = React.forwardRef(
  ({
    as = "hr",
    color = "stroke.neutralMuted",
    thickness = 1,
    orientation = "horizontal",
    inset = false,
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsx(
      Box,
      {
        ref,
        as,
        ...(as === "hr" && orientation !== "horizontal" && (props.role === void 0 || props.role === "separator") || // if not hr but role is separator aria-orientation is needed
        as !== "hr" && props.role === "separator") && {
          "aria-orientation": orientation
        },
        display: "block",
        borderColor: color,
        borderWidth: 0,
        ...orientation === "vertical" && { borderRightWidth: thickness },
        ...orientation === "horizontal" && { borderBottomWidth: thickness },
        ...props,
        style: {
          ...inset && orientation === "horizontal" && {
            marginLeft: "16px",
            marginRight: "16px"
          },
          ...inset && orientation === "vertical" && {
            marginTop: "16px",
            marginBottom: "16px"
          },
          ...props.style
        }
      }
    );
  }
);

export { Divider };
