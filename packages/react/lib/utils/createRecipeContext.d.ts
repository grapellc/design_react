type Recipe<Props extends Record<string, string | boolean | undefined>> = ((props?: Props) => string) & {
    splitVariantProps: <T extends Props>(props: T) => [Props, Omit<T, keyof Props>];
};
export declare function createRecipeContext<Props extends Record<string, string | boolean | undefined>>(recipe: Recipe<Props>): {
    PropsProvider: ({ children, value }: {
        children: React.ReactNode;
        value: Props;
    }) => import("react/jsx-runtime").JSX.Element;
    useProps: () => Props | null;
    withContext: <T, P>(Component: React.ElementType<any>, options?: {
        defaultProps?: Partial<P>;
    }) => React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>>;
    withPropsProvider: <P>() => React.Provider<Partial<P>>;
};
export {};
//# sourceMappingURL=createRecipeContext.d.ts.map