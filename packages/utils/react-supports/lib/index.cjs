var react = require('react');

function useSupports(selector) {
    const [isSupported, setIsSupported] = react.useState(null);
    react.useEffect(()=>{
        setIsSupported(CSS.supports(selector));
    }, [
        selector
    ]);
    return isSupported;
}

exports.useSupports = useSupports;
