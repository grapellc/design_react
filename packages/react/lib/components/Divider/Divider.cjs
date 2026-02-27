'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const Box = require('../Box/Box.cjs');

function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
  if (e) {
    for (const k in e) {
      if (k !== 'default') {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}

const React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

const Divider = React__namespace.forwardRef(
  ({
    as = "hr",
    color = "stroke.neutralMuted",
    thickness = 1,
    orientation = "horizontal",
    inset = false,
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      Box.Box,
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

exports.Divider = Divider;
