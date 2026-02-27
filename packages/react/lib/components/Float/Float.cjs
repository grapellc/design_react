'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const Box = require('../Box/Box.cjs');
const styled = require('../../utils/styled.cjs');

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

function getPlacementStyle(placement, offsetX, offsetY) {
  const offsetXValue = styled.handleDimension(offsetX);
  const offsetYValue = styled.handleDimension(offsetY);
  const centerLeft = offsetXValue ? `calc(50% + ${offsetXValue})` : "50%";
  const middleTop = offsetYValue ? `calc(50% + ${offsetYValue})` : "50%";
  const shiftLeft = "translateX(-50%)";
  const shiftTop = "translateY(-50%)";
  const shiftBoth = "translate(-50%, -50%)";
  switch (placement) {
    case "top-start":
      return {
        top: offsetYValue ?? 0,
        left: offsetXValue ?? 0
      };
    case "top-center":
      return {
        top: offsetYValue ?? 0,
        left: centerLeft,
        unstable_transform: shiftLeft
      };
    case "top-end":
      return {
        top: offsetYValue ?? 0,
        right: offsetXValue ?? 0
      };
    case "middle-start":
      return {
        top: middleTop,
        left: offsetXValue ?? 0,
        unstable_transform: shiftTop
      };
    case "middle-center":
      return {
        top: middleTop,
        left: centerLeft,
        unstable_transform: shiftBoth
      };
    case "middle-end":
      return {
        top: middleTop,
        right: offsetXValue ?? 0,
        unstable_transform: shiftTop
      };
    case "bottom-start":
      return {
        bottom: offsetYValue ?? 0,
        left: offsetXValue ?? 0
      };
    case "bottom-center":
      return {
        bottom: offsetYValue ?? 0,
        left: centerLeft,
        unstable_transform: shiftLeft
      };
    case "bottom-end":
      return {
        bottom: offsetYValue ?? 0,
        right: offsetXValue ?? 0
      };
  }
}
const Float = React__namespace.forwardRef((props, ref) => {
  const { as, placement, offsetX, offsetY, zIndex, ...rest } = props;
  const placementStyle = getPlacementStyle(placement, offsetX, offsetY);
  return /* @__PURE__ */ jsxRuntime.jsx(
    Box.Box,
    {
      ref,
      as,
      position: "absolute",
      display: "inline-flex",
      zIndex,
      ...placementStyle,
      ...rest
    }
  );
});

exports.Float = Float;
