import { CreateSnackbarOptions } from '@grape-design/react-snackbar';
export type UseSnackbarAdapterReturn = ReturnType<typeof useSnackbarAdapter>;
/**
 * wraps the snackbar context to provide a more user-friendly API
 */
export declare function useSnackbarAdapter(): {
    visible: boolean;
    create: (options: CreateSnackbarOptions) => void;
    dismiss: () => void;
};
//# sourceMappingURL=useSnackbarAdapter.d.ts.map