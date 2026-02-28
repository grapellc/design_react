'use client';
import { jsx } from 'react/jsx-runtime';
import { mannerTemp } from '@grape-design/css/recipes/manner-temp';
import { Primitive } from '@grape-design/react-primitive';
import { forwardRef, useMemo } from 'react';
import { createRecipeContext } from '../../utils/createRecipeContext.js';
import { MannerTempEmotePropsProvider } from './MannerTempEmote.js';

const { withContext } = createRecipeContext(mannerTemp);
const MannerTempBase = withContext(Primitive.span);
const MannerTemp = forwardRef((props, ref) => {
  const emoteProps = useMemo(() => ({ level: props.level }), [props.level]);
  return /* @__PURE__ */ jsx(MannerTempEmotePropsProvider, { value: emoteProps, children: /* @__PURE__ */ jsx(MannerTempBase, { ...props, ref }) });
});

export { MannerTemp };
