type SlotRecipe<Props extends Record<string, string | boolean | undefined>, Classnames extends Record<string, string>> = ((props?: Props) => Classnames) & {
    splitVariantProps: <T extends Props>(props: T) => [Props, Omit<T, keyof Props>];
};
export declare function createSlotRecipeContext<Props extends Record<string, string | boolean | undefined>, Classnames extends Record<string, string>>(recipe: SlotRecipe<Props, Classnames>): {
    ClassNamesProvider: ({ children, value, }: {
        children: React.ReactNode;
        value: Classnames;
    }) => import("react/jsx-runtime").JSX.Element;
    PropsProvider: ({ children, value }: {
        children: React.ReactNode;
        value: Props;
    }) => import("react/jsx-runtime").JSX.Element;
    useClassNames: () => Classnames;
    useProps: () => Props | null;
    withRootProvider: <P>(Component: React.ElementType<any>, options?: {
        defaultProps?: Partial<P>;
    }) => React.ForwardRefExoticComponent<React.PropsWithoutRef<P>>;
    withProvider: <T, P>(Component: React.ElementType<any>, slot: keyof Classnames, options?: {
        defaultProps?: Partial<P>;
    }) => React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>>;
    withContext: <T, P>(Component: React.ElementType<any>, slot?: keyof Classnames) => React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>>;
};
export {};
//# sourceMappingURL=createSlotRecipeContext.d.ts.map