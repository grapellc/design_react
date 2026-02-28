'use client';
import { jsx } from 'react/jsx-runtime';
import { composeRefs } from '@radix-ui/react-compose-refs';
import { useLayoutEffect } from '@radix-ui/react-use-layout-effect';
import { elementProps, imgProps, dataAttr, mergeProps } from '@grapu-design/dom-utils';
import { Primitive } from '@grapu-design/react-primitive';
import { useState, useRef, useMemo, useCallback, createContext, useContext, forwardRef } from 'react';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';

function useImage(props) {
    const onLoadingStatusChange = useCallbackRef(props.onLoadingStatusChange);
    const [loadingStatus, setLoadingStatus] = useState("loading");
    const imageRef = useRef(null);
    useLayoutEffect(()=>{
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
    const stateProps = useMemo(()=>elementProps({
            "data-loading-state": loadingStatus
        }), [
        loadingStatus
    ]);
    const setSrc = useCallback((src)=>{
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
    const getContentProps = useCallback(({ src })=>{
        return imgProps({
            hidden: !isLoaded,
            "data-visible": dataAttr(isLoaded),
            src,
            ...stateProps
        });
    }, [
        isLoaded,
        stateProps
    ]);
    const handleLoad = useCallback(()=>{
        setLoadingStatus("loaded");
        onLoadingStatusChange?.("loaded");
    }, [
        onLoadingStatusChange
    ]);
    const handleError = useCallback(()=>{
        setLoadingStatus("error");
        onLoadingStatusChange?.("error");
    }, [
        onLoadingStatusChange
    ]);
    const fallbackProps = useMemo(()=>elementProps({
            hidden: isLoaded,
            "data-visible": dataAttr(!isLoaded),
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

const ImageContext = /*#__PURE__*/ createContext(null);
const ImageProvider = ImageContext.Provider;
function useImageContext({ strict = true } = {}) {
    const context = useContext(ImageContext);
    if (!context && strict) {
        throw new Error("useImageContext must be used within an Image");
    }
    return context;
}

const ImageRoot = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { onLoadingStatusChange, ...otherProps } = props;
    const api = useImage({
        onLoadingStatusChange
    });
    return /*#__PURE__*/ jsx(ImageProvider, {
        value: api,
        children: /*#__PURE__*/ jsx(Primitive.div, {
            ref: ref,
            ...mergeProps(api.rootProps, otherProps)
        })
    });
});
ImageRoot.displayName = "ImageRoot";
const ImageContent = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { src, onLoad, onError, ...otherProps } = props;
    const { refs, setSrc, getContentProps, handleLoad, handleError } = useImageContext();
    useLayoutEffect(()=>{
        setSrc(src);
    }, [
        src,
        setSrc
    ]);
    const contentProps = getContentProps({
        src
    });
    return /*#__PURE__*/ jsx(Primitive.img, {
        ref: composeRefs(refs.image, ref),
        ...mergeProps(contentProps, otherProps, {
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
const ImageFallback = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { fallbackProps } = useImageContext();
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: ref,
        ...mergeProps(fallbackProps, props)
    });
});
ImageFallback.displayName = "ImageFallback";

export { ImageContent as I, ImageFallback as a, ImageRoot as b, useImageContext as c, useImage as u };
