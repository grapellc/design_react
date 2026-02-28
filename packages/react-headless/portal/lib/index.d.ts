import * as react_jsx_runtime from 'react/jsx-runtime';
import { PropsWithChildren, RefObject } from 'react';

interface PortalProps {
    disabled?: boolean;
    container?: RefObject<HTMLElement | null>;
}
declare const Portal: (props: PropsWithChildren<PortalProps>) => react_jsx_runtime.JSX.Element;

export { Portal };
export type { PortalProps };
