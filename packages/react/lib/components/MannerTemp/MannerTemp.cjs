'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const mannerTemp = require('@grape-design/css/recipes/manner-temp');
const reactPrimitive = require('@seed-design/react-primitive');
const React = require('react');
const createRecipeContext = require('../../utils/createRecipeContext.cjs');
const MannerTempEmote = require('./MannerTempEmote.cjs');

const { withContext } = createRecipeContext.createRecipeContext(mannerTemp.mannerTemp);
const MannerTempBase = withContext(reactPrimitive.Primitive.span);
const MannerTemp = React.forwardRef((props, ref) => {
  const emoteProps = React.useMemo(() => ({ level: props.level }), [props.level]);
  return /* @__PURE__ */ jsxRuntime.jsx(MannerTempEmote.MannerTempEmotePropsProvider, { value: emoteProps, children: /* @__PURE__ */ jsxRuntime.jsx(MannerTempBase, { ...props, ref }) });
});

exports.MannerTemp = MannerTemp;
