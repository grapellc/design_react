declare module '@stackflow/config' {
  interface Register {
    [key: string]: unknown;
  }

  export type RegisteredActivityName = Extract<keyof Register, string>;
  export function defineConfig(configDefinition: {
    activities: { name: RegisteredActivityName }[];
    transitionDuration?: number;
    initialActivity?: () => RegisteredActivityName;
  }): unknown;
}
