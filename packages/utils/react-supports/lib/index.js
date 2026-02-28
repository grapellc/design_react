import { useState, useEffect } from 'react';

function useSupports(selector) {
    const [isSupported, setIsSupported] = useState(null);
    useEffect(()=>{
        setIsSupported(CSS.supports(selector));
    }, [
        selector
    ]);
    return isSupported;
}

export { useSupports };
