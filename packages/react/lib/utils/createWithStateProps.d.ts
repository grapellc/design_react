import { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react';
type AtLeastOne<T> = [T, ...T[]];
type ContextHook = (prop?: {
    strict?: boolean;
}) => {
    stateProps: React.HTMLAttributes<HTMLElement>;
} | null;
type ContextConfig = ContextHook | {
    useContext: ContextHook;
    strict?: boolean;
};
export declare function createWithStateProps(useContexts: AtLeastOne<ContextConfig>): <P, R>(Component: React.ComponentType<P & React.RefAttributes<R>>) => ForwardRefExoticComponent< PropsWithoutRef<P> & RefAttributes<R>>;
export {};
//# sourceMappingURL=createWithStateProps.d.ts.map