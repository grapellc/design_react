'use client';
'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');

const src = {
  l1: {
    x2: "https://assetstorage.krrt.io/1123529253537884138/b63c9b3c-410c-4cf5-ba83-d787a03c3c57/width_64_height_64.webp",
    x3: "https://assetstorage.krrt.io/1123529253537884138/b63c9b3c-410c-4cf5-ba83-d787a03c3c57/width_96_height_96.webp",
    x4: "https://assetstorage.krrt.io/1123529253537884138/b63c9b3c-410c-4cf5-ba83-d787a03c3c57/width_128_height_128.webp"
  },
  l2: {
    x2: "https://assetstorage.krrt.io/1123529253537884138/8e4bc458-f6d4-41ce-bfa2-17ea34022f5b/width_64_height_64.webp",
    x3: "https://assetstorage.krrt.io/1123529253537884138/8e4bc458-f6d4-41ce-bfa2-17ea34022f5b/width_96_height_96.webp",
    x4: "https://assetstorage.krrt.io/1123529253537884138/8e4bc458-f6d4-41ce-bfa2-17ea34022f5b/width_128_height_128.webp"
  },
  l3: {
    x2: "https://assetstorage.krrt.io/1123529253537884138/906ff501-edf6-402d-a3a4-a93ce9e04d30/width_64_height_64.webp",
    x3: "https://assetstorage.krrt.io/1123529253537884138/906ff501-edf6-402d-a3a4-a93ce9e04d30/width_96_height_96.webp",
    x4: "https://assetstorage.krrt.io/1123529253537884138/906ff501-edf6-402d-a3a4-a93ce9e04d30/width_128_height_128.webp"
  },
  l4: {
    x2: "https://assetstorage.krrt.io/1123529253537884138/10753976-b25d-4e4c-84b2-dbbe196dd0d9/width_64_height_64.webp",
    x3: "https://assetstorage.krrt.io/1123529253537884138/10753976-b25d-4e4c-84b2-dbbe196dd0d9/width_96_height_96.webp",
    x4: "https://assetstorage.krrt.io/1123529253537884138/10753976-b25d-4e4c-84b2-dbbe196dd0d9/width_128_height_128.webp"
  },
  l5: {
    x2: "https://assetstorage.krrt.io/1123529253537884138/ddfbd296-5089-408c-aa37-919f45074e5e/width_64_height_64.webp",
    x3: "https://assetstorage.krrt.io/1123529253537884138/ddfbd296-5089-408c-aa37-919f45074e5e/width_96_height_96.webp",
    x4: "https://assetstorage.krrt.io/1123529253537884138/ddfbd296-5089-408c-aa37-919f45074e5e/width_128_height_128.webp"
  },
  l6: {
    x2: "https://assetstorage.krrt.io/1123529253537884138/bf8f9b4d-c72e-4bf2-a094-460d3ad1b11f/width_64_height_64.webp",
    x3: "https://assetstorage.krrt.io/1123529253537884138/bf8f9b4d-c72e-4bf2-a094-460d3ad1b11f/width_96_height_96.webp",
    x4: "https://assetstorage.krrt.io/1123529253537884138/bf8f9b4d-c72e-4bf2-a094-460d3ad1b11f/width_128_height_128.webp"
  },
  l7: {
    x2: "https://assetstorage.krrt.io/1123529253537884138/9906a459-a4e3-4521-a6e5-0cc24c0aa763/width_64_height_64.webp",
    x3: "https://assetstorage.krrt.io/1123529253537884138/9906a459-a4e3-4521-a6e5-0cc24c0aa763/width_96_height_96.webp",
    x4: "https://assetstorage.krrt.io/1123529253537884138/9906a459-a4e3-4521-a6e5-0cc24c0aa763/width_128_height_128.webp"
  },
  l8: {
    x2: "https://assetstorage.krrt.io/1123529253537884138/438edadb-d31d-4711-aebd-a72f303fdf49/width_64_height_64.webp",
    x3: "https://assetstorage.krrt.io/1123529253537884138/438edadb-d31d-4711-aebd-a72f303fdf49/width_96_height_96.webp",
    x4: "https://assetstorage.krrt.io/1123529253537884138/438edadb-d31d-4711-aebd-a72f303fdf49/width_128_height_128.webp"
  },
  l9: {
    x2: "https://assetstorage.krrt.io/1123529253537884138/61f6c297-11da-4d72-ba90-20cd69c09c22/width_64_height_64.webp",
    x3: "https://assetstorage.krrt.io/1123529253537884138/61f6c297-11da-4d72-ba90-20cd69c09c22/width_96_height_96.webp",
    x4: "https://assetstorage.krrt.io/1123529253537884138/61f6c297-11da-4d72-ba90-20cd69c09c22/width_128_height_128.webp"
  },
  l10: {
    x2: "https://assetstorage.krrt.io/1123529253537884138/6cc410ac-3a55-4542-b49f-53551db74c4d/width_64_height_64.webp",
    x3: "https://assetstorage.krrt.io/1123529253537884138/6cc410ac-3a55-4542-b49f-53551db74c4d/width_96_height_96.webp",
    x4: "https://assetstorage.krrt.io/1123529253537884138/6cc410ac-3a55-4542-b49f-53551db74c4d/width_128_height_128.webp"
  }
};
const createImgProps = ({ x2, x3, x4 }) => ({
  src: x2,
  // this is used on x1 displays
  srcSet: `${x2} 2x, ${x3} 3x, ${x4} 4x`
});
const l1 = React.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntime.jsx("img", { ...createImgProps(src.l1), "aria-hidden": true, ref, ...props }));
const l2 = React.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntime.jsx("img", { ...createImgProps(src.l2), "aria-hidden": true, ref, ...props }));
const l3 = React.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntime.jsx("img", { ...createImgProps(src.l3), "aria-hidden": true, ref, ...props }));
const l4 = React.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntime.jsx("img", { ...createImgProps(src.l4), "aria-hidden": true, ref, ...props }));
const l5 = React.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntime.jsx("img", { ...createImgProps(src.l5), "aria-hidden": true, ref, ...props }));
const l6 = React.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntime.jsx("img", { ...createImgProps(src.l6), "aria-hidden": true, ref, ...props }));
const l7 = React.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntime.jsx("img", { ...createImgProps(src.l7), "aria-hidden": true, ref, ...props }));
const l8 = React.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntime.jsx("img", { ...createImgProps(src.l8), "aria-hidden": true, ref, ...props }));
const l9 = React.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntime.jsx("img", { ...createImgProps(src.l9), "aria-hidden": true, ref, ...props }));
const l10 = React.forwardRef(
  (props, ref) => /* @__PURE__ */ jsxRuntime.jsx("img", { ...createImgProps(src.l10), "aria-hidden": true, ref, ...props })
);
const emotes = {
  l1,
  l2,
  l3,
  l4,
  l5,
  l6,
  l7,
  l8,
  l9,
  l10
};
const MannerTempEmotePropsContext = React.createContext(null);
const MannerTempEmotePropsProvider = MannerTempEmotePropsContext.Provider;
const MannerTempEmote = React.forwardRef(
  ({ level: __level, ...props }, ref) => {
    const level = __level ?? React.useContext(MannerTempEmotePropsContext)?.level ?? "l1";
    const Emote = emotes[level];
    return /* @__PURE__ */ jsxRuntime.jsx(Emote, { ref, ...props });
  }
);

exports.MannerTempEmote = MannerTempEmote;
exports.MannerTempEmotePropsProvider = MannerTempEmotePropsProvider;
