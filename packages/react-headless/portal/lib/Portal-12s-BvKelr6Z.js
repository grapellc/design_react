'use client';
import { jsx, Fragment } from 'react/jsx-runtime';
import { useState, useSyncExternalStore, useEffect, Children } from 'react';
import { createPortal } from 'react-dom';

const Portal = (props)=>{
    const { children, disabled } = props;
    const [container, setContainer] = useState(props.container?.current);
    const isServer = useSyncExternalStore(subscribe, ()=>false, ()=>true);
    useEffect(()=>{
        setContainer(()=>props.container?.current);
    }, [
        props.container
    ]);
    if (isServer || disabled) return /*#__PURE__*/ jsx(Fragment, {
        children: children
    });
    const mountNode = container ?? (!isServer && globalThis?.document?.body);
    return mountNode ? /*#__PURE__*/ jsx(Fragment, {
        children: Children.map(children, (child)=>/*#__PURE__*/ createPortal(child, mountNode))
    }) : null;
};
const subscribe = ()=>()=>{};

export { Portal as P };
