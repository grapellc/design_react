import { StyleProps } from '../../utils/styled';
import { ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';
export interface PrefixIconProps {
    svg: React.ReactNode;
}
export declare const PrefixIcon: ForwardRefExoticComponent<PrefixIconProps & RefAttributes<SVGSVGElement>>;
export interface SuffixIconProps {
    svg: React.ReactNode;
}
export declare const SuffixIcon: ForwardRefExoticComponent<SuffixIconProps & RefAttributes<SVGSVGElement>>;
export declare const IconRequired: ({ children, enabled, }: {
    children: React.ReactNode;
    enabled: boolean;
}) => import("react/jsx-runtime").JSX.Element;
export interface IconProps {
    svg: React.ReactNode;
    size?: StyleProps["height"];
    color?: StyleProps["color"];
}
export declare const Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
export declare function withIconRequired<P extends {}, R>(Component: React.ComponentType<P & React.RefAttributes<R>>, enabledPredicate: (props: React.PropsWithoutRef<P>) => boolean): ForwardRefExoticComponent< PropsWithoutRef<P> & RefAttributes<R>>;
//# sourceMappingURL=Icon.d.ts.map