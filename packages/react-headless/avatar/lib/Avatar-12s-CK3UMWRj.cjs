'use client';
var jsxRuntime = require('react/jsx-runtime');
var reactComposeRefs = require('@radix-ui/react-compose-refs');
var domUtils = require('@grapu-design/dom-utils');
var reactPrimitive = require('@grapu-design/react-primitive');
var react = require('react');
var reactUseCallbackRef = require('@radix-ui/react-use-callback-ref');
var reactUseLayoutEffect = require('@radix-ui/react-use-layout-effect');

function useAvatarState(props) {
    const [src, setSrc] = react.useState(undefined);
    const onLoadingStatusChange = reactUseCallbackRef.useCallbackRef(props.onLoadingStatusChange);
    const [loadingStatus, setLoadingStatus] = react.useState("loading");
    const events = react.useMemo(()=>({
            setSrc: (payload)=>{
                setSrc(payload.src);
                if (src === payload.src) return;
                if (payload.src === null) {
                    setLoadingStatus("error");
                    onLoadingStatusChange?.("error");
                } else {
                    setLoadingStatus("loading");
                    onLoadingStatusChange?.("loading");
                }
            },
            loadSuccess: ()=>{
                setLoadingStatus("loaded");
                onLoadingStatusChange?.("loaded");
            },
            loadError: ()=>{
                setLoadingStatus("error");
                onLoadingStatusChange?.("error");
            }
        }), [
        src,
        onLoadingStatusChange
    ]);
    return {
        loadingStatus,
        events
    };
}
function useAvatar(props) {
    const { loadingStatus, events } = useAvatarState(props);
    const imageRef = react.useRef(null);
    // TODO: this is triggered after hydration, so image display is delayed in SSR environment. We might add "idle" status or adjust css to handle this.
    reactUseLayoutEffect.useLayoutEffect(()=>{
        if (imageRef.current) {
            if (imageRef.current.complete) {
                if (imageRef.current.naturalWidth === 0 || imageRef.current.naturalHeight === 0) {
                    events.loadError();
                } else {
                    events.loadSuccess();
                }
            }
        }
    }, [
        events
    ]);
    const isLoaded = loadingStatus === "loaded";
    const stateProps = domUtils.elementProps({
        "data-loading-state": loadingStatus
    });
    return {
        refs: {
            image: imageRef
        },
        loadingStatus,
        stateProps,
        rootProps: domUtils.elementProps({
            ...stateProps
        }),
        getImageProps: ({ src, onLoad, onError })=>{
            reactUseLayoutEffect.useLayoutEffect(()=>{
                events.setSrc({
                    src
                });
            }, [
                src
            ]);
            return domUtils.imgProps({
                hidden: !isLoaded,
                "data-visible": domUtils.dataAttr(isLoaded),
                src,
                onLoad: (e)=>{
                    events.loadSuccess();
                    onLoad?.(e);
                },
                onError: (e)=>{
                    events.loadError();
                    onError?.(e);
                },
                ...stateProps
            });
        },
        fallbackProps: domUtils.elementProps({
            hidden: isLoaded,
            "data-visible": domUtils.dataAttr(!isLoaded),
            ...stateProps
        })
    };
}

const AvatarContext = /*#__PURE__*/ react.createContext(null);
const AvatarProvider = AvatarContext.Provider;
function useAvatarContext({ strict = true } = {}) {
    const context = react.useContext(AvatarContext);
    if (!context && strict) {
        throw new Error("useAvatarContext must be used within a Avatar");
    }
    return context;
}

const AvatarRoot = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { onLoadingStatusChange, ...otherProps } = props;
    const api = useAvatar({
        onLoadingStatusChange
    });
    return /*#__PURE__*/ jsxRuntime.jsx(AvatarProvider, {
        value: api,
        children: /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
            ref: ref,
            ...domUtils.mergeProps(api.rootProps, otherProps)
        })
    });
});
AvatarRoot.displayName = "AvatarRoot";
const AvatarImage = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { src, onLoad, onError, ...otherProps } = props;
    const { refs, getImageProps } = useAvatarContext();
    const imageProps = getImageProps({
        src,
        onLoad,
        onError
    });
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.img, {
        ref: reactComposeRefs.composeRefs(refs.image, ref),
        ...domUtils.mergeProps(imageProps, otherProps)
    });
});
AvatarImage.displayName = "AvatarImage";
const AvatarFallback = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { fallbackProps } = useAvatarContext();
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
        ref: ref,
        ...domUtils.mergeProps(fallbackProps, props)
    });
});
AvatarFallback.displayName = "AvatarFallback";

exports.AvatarFallback = AvatarFallback;
exports.AvatarImage = AvatarImage;
exports.AvatarRoot = AvatarRoot;
exports.useAvatarContext = useAvatarContext;
