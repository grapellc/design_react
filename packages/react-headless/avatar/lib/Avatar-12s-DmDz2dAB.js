'use client';
import { jsx } from 'react/jsx-runtime';
import { composeRefs } from '@radix-ui/react-compose-refs';
import { elementProps, dataAttr, imgProps, mergeProps } from '@grape-design/dom-utils';
import { Primitive } from '@grape-design/react-primitive';
import { useRef, useState, useMemo, createContext, useContext, forwardRef } from 'react';
import { useCallbackRef } from '@radix-ui/react-use-callback-ref';
import { useLayoutEffect } from '@radix-ui/react-use-layout-effect';

function useAvatarState(props) {
    const [src, setSrc] = useState(undefined);
    const onLoadingStatusChange = useCallbackRef(props.onLoadingStatusChange);
    const [loadingStatus, setLoadingStatus] = useState("loading");
    const events = useMemo(()=>({
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
    const imageRef = useRef(null);
    // TODO: this is triggered after hydration, so image display is delayed in SSR environment. We might add "idle" status or adjust css to handle this.
    useLayoutEffect(()=>{
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
    const stateProps = elementProps({
        "data-loading-state": loadingStatus
    });
    return {
        refs: {
            image: imageRef
        },
        loadingStatus,
        stateProps,
        rootProps: elementProps({
            ...stateProps
        }),
        getImageProps: ({ src, onLoad, onError })=>{
            useLayoutEffect(()=>{
                events.setSrc({
                    src
                });
            }, [
                src
            ]);
            return imgProps({
                hidden: !isLoaded,
                "data-visible": dataAttr(isLoaded),
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
        fallbackProps: elementProps({
            hidden: isLoaded,
            "data-visible": dataAttr(!isLoaded),
            ...stateProps
        })
    };
}

const AvatarContext = /*#__PURE__*/ createContext(null);
const AvatarProvider = AvatarContext.Provider;
function useAvatarContext({ strict = true } = {}) {
    const context = useContext(AvatarContext);
    if (!context && strict) {
        throw new Error("useAvatarContext must be used within a Avatar");
    }
    return context;
}

const AvatarRoot = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { onLoadingStatusChange, ...otherProps } = props;
    const api = useAvatar({
        onLoadingStatusChange
    });
    return /*#__PURE__*/ jsx(AvatarProvider, {
        value: api,
        children: /*#__PURE__*/ jsx(Primitive.div, {
            ref: ref,
            ...mergeProps(api.rootProps, otherProps)
        })
    });
});
AvatarRoot.displayName = "AvatarRoot";
const AvatarImage = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { src, onLoad, onError, ...otherProps } = props;
    const { refs, getImageProps } = useAvatarContext();
    const imageProps = getImageProps({
        src,
        onLoad,
        onError
    });
    return /*#__PURE__*/ jsx(Primitive.img, {
        ref: composeRefs(refs.image, ref),
        ...mergeProps(imageProps, otherProps)
    });
});
AvatarImage.displayName = "AvatarImage";
const AvatarFallback = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { fallbackProps } = useAvatarContext();
    return /*#__PURE__*/ jsx(Primitive.div, {
        ref: ref,
        ...mergeProps(fallbackProps, props)
    });
});
AvatarFallback.displayName = "AvatarFallback";

export { AvatarFallback as A, AvatarImage as a, AvatarRoot as b, useAvatarContext as u };
