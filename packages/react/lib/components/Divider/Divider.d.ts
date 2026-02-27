import { BoxProps } from '../Box/Box';
import * as React from "react";
export interface DividerProps extends Omit<React.HTMLAttributes<HTMLHRElement>, "color"> {
    /**
     * The HTML element to use for the divider.
     * Keep in mind that "hr" elements are read by screen readers as a semantic break with an implicit role="separator"
     * If the element should be read by screen readers but be rendered as an element other than "hr", give an explicit role="separator"
     * @default "hr"
     */
    as?: "hr" | "div" | "li";
    /**
     * @default "stroke.neutralMuted"
     */
    color?: BoxProps["borderColor"];
    /**
     * @default 1
     */
    thickness?: BoxProps["borderWidth"];
    /**
     * @default "horizontal"
     */
    orientation?: "horizontal" | "vertical";
    /**
     * @default false
     */
    inset?: boolean;
}
export declare const Divider: React.ForwardRefExoticComponent<DividerProps & React.RefAttributes<HTMLHRElement>>;
//# sourceMappingURL=Divider.d.ts.map