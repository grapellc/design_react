'use client';
var jsxRuntime = require('react/jsx-runtime');
var reactComposeRefs = require('@radix-ui/react-compose-refs');
var reactUseLayoutEffect = require('@radix-ui/react-use-layout-effect');
var domUtils = require('@grape-design/dom-utils');
var reactPrimitive = require('@grape-design/react-primitive');
var react = require('react');
var reactUseCallbackRef = require('@radix-ui/react-use-callback-ref');

function useImage(props) {
    const onLoadingStatusChange = reactUseCallbackRef.useCallbackRef(props.onLoadingStatusChange);
    const [loadingStatus, setLoadingStatus] = react.useState("loading");
    const imageRef = react.useRef(null);
    reactUseLayoutEffect.useLayoutEffect(()=>{
        if (imageRef.current) {
            if (imageRef.current.complete) {
                if (imageRef.current.naturalWidth === 0 || imageRef.current.naturalHeight === 0) {
                    setLoadingStatus("error");
                    onLoadingStatusChange?.("error");
                } else {
                    setLoadingStatus("loaded");
                    onLoadingStatusChange?.("loaded");
                }
            }
        }
    }, [
        onLoadingStatusChange
    ]);
    const isLoaded = loadingStatus === "loaded";
    const stateProps = react.useMemo(()=>domUtils.elementProps({
            "data-loading-state": loadingStatus
        }), [
        loadingStatus
    ]);
    const setSrc = react.useCallback((src)=>{
        if (src === undefined || src === null) {
            setLoadingStatus("error");
            onLoadingStatusChange?.("error");
        } else {
            setLoadingStatus("loading");
            onLoadingStatusChange?.("loading");
        }
    }, [
        onLoadingStatusChange
    ]);
    const getContentProps = react.useCallback(({ src })=>{
        return domUtils.imgProps({
            hidden: !isLoaded,
            "data-visible": domUtils.dataAttr(isLoaded),
            src,
            ...stateProps
        });
    }, [
        isLoaded,
        stateProps
    ]);
    const handleLoad = react.useCallback(()=>{
        setLoadingStatus("loaded");
        onLoadingStatusChange?.("loaded");
    }, [
        onLoadingStatusChange
    ]);
    const handleError = react.useCallback(()=>{
        setLoadingStatus("error");
        onLoadingStatusChange?.("error");
    }, [
        onLoadingStatusChange
    ]);
    const fallbackProps = react.useMemo(()=>domUtils.elementProps({
            hidden: isLoaded,
            "data-visible": domUtils.dataAttr(!isLoaded),
            ...stateProps
        }), [
        isLoaded,
        stateProps
    ]);
    return {
        refs: {
            image: imageRef
        },
        loadingStatus,
        stateProps,
        rootProps: stateProps,
        setSrc,
        getContentProps,
        handleLoad,
        handleError,
        fallbackProps
    };
}

const ImageContext = /*#__PURE__*/ react.createContext(null);
const ImageProvider = ImageContext.Provider;
function useImageContext({ strict = true } = {}) {
    const context = react.useContext(ImageContext);
    if (!context && strict) {
        throw new Error("useImageContext must be used within an Image");
    }
    return context;
}

const ImageRoot = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { onLoadingStatusChange, ...otherProps } = props;
    const api = useImage({
        onLoadingStatusChange
    });
    return /*#__PURE__*/ jsxRuntime.jsx(ImageProvider, {
        value: api,
        children: /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
            ref: ref,
            ...domUtils.mergeProps(api.rootProps, otherProps)
        })
    });
});
ImageRoot.displayName = "ImageRoot";
const ImageContent = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { src, onLoad, onError, ...otherProps } = props;
    const { refs, setSrc, getContentProps, handleLoad, handleError } = useImageContext();
    reactUseLayoutEffect.useLayoutEffect(()=>{
        setSrc(src);
    }, [
        src,
        setSrc
    ]);
    const contentProps = getContentProps({
        src
    });
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.img, {
        ref: reactComposeRefs.composeRefs(refs.image, ref),
        ...domUtils.mergeProps(contentProps, otherProps, {
            // if loading is lazy, we should not hide the image even if it's not loaded yet,
            // because the browser should be able to check if it's in the viewport.
            // TODO: it should be better than this; why doesn't useImage properly handle this case?
            hidden: otherProps.loading === "lazy" ? false : contentProps.hidden
        }),
        onLoad: (e)=>{
            handleLoad();
            onLoad?.(e);
        },
        onError: (e)=>{
            handleError();
            onError?.(e);
        }
    });
});
ImageContent.displayName = "ImageContent";
const ImageFallback = /*#__PURE__*/ react.forwardRef((props, ref)=>{
    const { fallbackProps } = useImageContext();
    return /*#__PURE__*/ jsxRuntime.jsx(reactPrimitive.Primitive.div, {
        ref: ref,
        ...domUtils.mergeProps(fallbackProps, props)
    });
});
ImageFallback.displayName = "ImageFallback";

exports.ImageContent = ImageContent;
exports.ImageFallback = ImageFallback;
exports.ImageRoot = ImageRoot;
exports.useImage = useImage;
exports.useImageContext = useImageContext;
