'use client';
var jsxRuntime = require('react/jsx-runtime');
var react = require('react');
var reactDom = require('react-dom');

const Portal = (props)=>{
    const { children, disabled } = props;
    const [container, setContainer] = react.useState(props.container?.current);
    const isServer = react.useSyncExternalStore(subscribe, ()=>false, ()=>true);
    react.useEffect(()=>{
        setContainer(()=>props.container?.current);
    }, [
        props.container
    ]);
    if (isServer || disabled) return /*#__PURE__*/ jsxRuntime.jsx(jsxRuntime.Fragment, {
        children: children
    });
    const mountNode = container ?? (!isServer && globalThis?.document?.body);
    return mountNode ? /*#__PURE__*/ jsxRuntime.jsx(jsxRuntime.Fragment, {
        children: react.Children.map(children, (child)=>/*#__PURE__*/ reactDom.createPortal(child, mountNode))
    }) : null;
};
const subscribe = ()=>()=>{};

exports.Portal = Portal;
